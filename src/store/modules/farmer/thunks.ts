import { createThunks } from '../../../utils/CoreModule';
import { Farmer } from './types';

const {
  createRow: createFarmer,
  updateRow: updateFarmer,
} = createThunks<Farmer>('farmer');

export default {
  createFarmer,
  updateFarmer,
};
