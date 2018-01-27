import { createThunks } from '../../../utils/CoreModule';
import { CorePath } from '../../../utils/CoreAPI/index';
import { DairyEntry } from './types';

const {
  createRow: createDairyEntry,
  updateRow: updateDairyEntry,
} = createThunks<DairyEntry>('dairy', CorePath.DAIRY);

export default {
  createDairyEntry,
  updateDairyEntry,
};
