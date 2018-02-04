import { createReducer, CoreModuleName } from '../../../utils/CoreModule';
import { MilkEntry } from './types';

export default createReducer<MilkEntry>(CoreModuleName.MILK);
