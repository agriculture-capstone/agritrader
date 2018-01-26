import { FarmerState, Farmer } from './types';
import UTCDate from '../../../utils/UTCDate';

const initialState: FarmerState = {
  dirty: false,
  farmers: [] as Farmer[],
  lastModified: UTCDate.OLD_DATE,
};

export default initialState;
