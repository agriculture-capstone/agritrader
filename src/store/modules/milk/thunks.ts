import { createThunks } from '../../../utils/CoreModule';
import { CorePath } from '../../../utils/CoreAPI/index';
import { MilkEntry } from './types';

const {
  createRow: createMilkEntry,
  updateRow: updateMilkEntry,
} = createThunks<MilkEntry>('milk', CorePath.MILK);

export default {
  createMilkEntry,
  updateMilkEntry,
};
