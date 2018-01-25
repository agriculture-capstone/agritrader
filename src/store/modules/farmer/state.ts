import { FarmerState, Farmer } from './types';

const initialState: FarmerState = {
  containsLocal: false,
  farmers: [] as Farmer[],
  lastModified: '1451635200000',
};

export default initialState;
