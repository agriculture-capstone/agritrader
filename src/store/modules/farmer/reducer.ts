import { createReducer, CoreModule } from '../../../utils/CoreModule';
import { Farmer } from './types';

export default createReducer<Farmer>(CoreModule.FARMER);
