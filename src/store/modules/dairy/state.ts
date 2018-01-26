import { DairyState, Dairy } from './types';

const initialState: DairyState = {
  containsLocal: false,
  dairyList: [] as Dairy[],
  lastModified: '1451635200000',
};

export default initialState;
