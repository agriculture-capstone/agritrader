import HTTPCode from '../HTTPCode';
import { AGRICORE_URL, AGRICORE_PORT } from '../../config';
import store from '../../store';
import sensitiveActions from '../../store/modules/sensitive/actions';
import { CoreUpdateRequest, CoreCreationRequest } from '../../store/types';

export enum CorePath {
  FARMERS = '/people/farmers',
  DAIRY = '/transactions/products/milk',
}

const LOGIN_PATH = '/actions/authenticate';

export type CoreRequestMethod
  = 'GET'     // Retrieve
  | 'POST'    // Create
  | 'PUT'     // Update
  | 'HEAD'    // Timestamp
  ;

export default class CoreAPI {
  private url: string;

  constructor(path: CorePath) {
    this.url = `${AGRICORE_URL}:${AGRICORE_PORT}${path}`;
  }

  public async get(uuid: string) {
    const url = `${this.url}/${uuid}`;
    const method: CoreRequestMethod = 'GET';
    const request = new Request(url, this.getOptions(method));

    return await this.coreFetch(request);
  }

  public async getAll() {
    const url = this.url;
    const method: CoreRequestMethod = 'GET';
    const request = new Request(url, this.getOptions(method));

    return this.coreFetch(request);
  }

  public async update<T>(data: CoreUpdateRequest<T>) {
    const url = this.url;
    const method: CoreRequestMethod = 'PUT';
    const request = new Request(url, this.getOptions(method, data));

    return this.coreFetch(request);
  }

  public async create<T>(data: CoreCreationRequest<T>) {
    const url = this.url;
    const method: CoreRequestMethod = 'POST';
    const request = new Request(url, this.getOptions(method, data));

    return this.coreFetch(request);
  }

  public async head(timestamp: string) {

  }

  private getOptions<T>(method: CoreRequestMethod, body?: T): RequestInit {

    const { jwt } = store.getState().sensitive;
    if (!jwt) {
      throw new Error('Not authenticated');
    }
    const headers = new Headers({
      'content-type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    });

    return {
      method,
      headers,
      body: JSON.stringify(body),
    };
  }

  private async coreFetch(request: Request) {
    // Declare block scoped variables (let) at top of block
    let response: Response;
    { let attempts: number = 0;
      const maxAttempts = 10;

      // Make request, attempt request again if 500 received
      do {
        // tslint:disable-next-line:no-console
        attempts && console.log('request failed with 500, making another attempt');
        response = await fetch(request);
      } while (response.status === HTTPCode.INTERNAL_SERVER_ERROR && attempts < maxAttempts);
    }

    if (!response.ok) throw response;

    else return await response.json();
  }

  public static async login(username: string, password: string): Promise<boolean> {
    const url = LOGIN_PATH;
    const method: CoreRequestMethod = 'POST';
    const headers = new Headers({
      'content-type': 'application/json',
    });

    const body = {
      username,
      password,
    };

    const request = new Request(url, {
      method,
      headers,
      body: JSON.stringify(body),
    });

    const response = await fetch(request);

    // Check response
    if (!response.ok) return false;

    const { jwt } = await response.json();
    store.dispatch(sensitiveActions.setJwt(jwt));

    return true;
  }
}
