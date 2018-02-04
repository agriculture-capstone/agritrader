import { createThunks, CoreModuleName } from '../../../utils/CoreModule';
import { Farmer } from './types';

const {
  createRow: createFarmer,
  updateRow: updateFarmer,
} = createThunks<Farmer>(CoreModuleName.FARMER);

export default {
  createFarmer,
  updateFarmer,
};
