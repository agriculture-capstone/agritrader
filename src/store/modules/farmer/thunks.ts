import { createThunks, CoreModule } from '../../../utils/CoreModule';
import { CorePath } from '../../../utils/CoreAPI/index';
import { Farmer } from './types';

const {
  createRow: createFarmer,
  updateRow: updateFarmer,
} = createThunks<Farmer>(CoreModule.FARMER, CorePath.FARMERS);

export default {
  createFarmer,
  updateFarmer,
};
