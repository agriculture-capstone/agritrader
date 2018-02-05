import { createThunks } from '../../../utils/CoreModule';
import { MilkEntry } from './types';

const {
  createRow: createMilkEntry,
  updateRow: updateMilkEntry,
} = createThunks<MilkEntry>('milk');

export default {
  createMilkEntry,
  updateMilkEntry,
};
