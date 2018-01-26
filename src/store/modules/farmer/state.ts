import { FarmerState, Farmer } from './types';
import UTCDate from '../../../utils/UTCDate';
import { StoreRow } from '../../types';

const initialState: FarmerState = {
  isDirty: false,
  rows: [] as StoreRow<Farmer>[],
  lastModified: UTCDate.OLD_DATE,
};

export default initialState;
