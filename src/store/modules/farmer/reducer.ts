import { createReducer, CoreModuleName } from '../../../utils/CoreModule';
import { Farmer } from './types';

export default createReducer<Farmer>(CoreModuleName.FARMER);
