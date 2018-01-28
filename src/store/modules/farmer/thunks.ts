import { createThunks, CoreModule } from '../../../utils/CoreModule';
import { Farmer } from './types';

const {
  createRow: createFarmer,
  updateRow: updateFarmer,
} = createThunks<Farmer>(CoreModule.FARMER);

export default {
  createFarmer,
  updateFarmer,
};
