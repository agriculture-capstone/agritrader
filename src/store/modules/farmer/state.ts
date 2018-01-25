import { FarmerState, Farmer } from './types';
import UTCDate from '../../../utils/UTCDate';

const initialState: FarmerState = {
  containsLocal: false,
  farmers: [] as Farmer[],
  lastModified: UTCDate.OLD_DATE,
};

export default initialState;
