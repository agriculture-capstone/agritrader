import { createThunks, CoreModuleName } from '../../../utils/CoreModule';
import { MilkEntry } from './types';

const {
  createRow: createMilkEntry,
  updateRow: updateMilkEntry,
} = createThunks<MilkEntry>(CoreModuleName.MILK);

export default {
  createMilkEntry,
  updateMilkEntry,
};
