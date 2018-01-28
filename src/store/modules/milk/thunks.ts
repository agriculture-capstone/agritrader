import { createThunks, CoreModule } from '../../../utils/CoreModule';
import { MilkEntry } from './types';

const {
  createRow: createMilkEntry,
  updateRow: updateMilkEntry,
} = createThunks<MilkEntry>(CoreModule.MILK);

export default {
  createMilkEntry,
  updateMilkEntry,
};
