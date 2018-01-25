import { AGRICORE_URL, AGRICORE_PORT } from '../../config';
import store from '../../store';

export enum CorePath {
  FARMERS = '/people/farmers',
}

export type CoreRequestMethod
  = 'GET'     // Retrieve
  | 'POST'    // Create
  | 'PUT'     // Update
  | 'HEAD'    // Timestamp
  ;

export default class CoreRequest<DataModel> {
  private url: string;

  constructor(path: CorePath) {
    this.url = `${AGRICORE_URL}:${AGRICORE_PORT}${path}`;
  }

  public async get(uuid: string) {
    const url = `${this.url}/${uuid}`;
    const method: CoreRequestMethod = 'GET';
    const request = new Request(url, this.getOptions(method));
    const response = await fetch(request);
    // TODO: Finish
  }

  public async getAll() {

  }

  public async update() {

  }

  public async create() {

  }

  public async head() {

  }

  private getOptions(method: CoreRequestMethod, body?: DataModel, useJwt = true): RequestInit {

    const headers = new Headers({
      'content-type': 'application/json',
    });

    if (useJwt) {
      const { jwt } = store.getState().sensitive;
      headers.append('Authorization', `Bearer ${jwt}`);
    }

    return {
      method,
      headers,
    };
  }
}
