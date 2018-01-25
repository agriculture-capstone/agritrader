import { State, Farmer } from './types';

const initialState: State = {
  containsLocal: false,
  farmers: [] as Farmer[],
  lastModified: Date.now(),
}
