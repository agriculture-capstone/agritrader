import { createReducer, CoreModule } from '../../../utils/CoreModule';
import { MilkEntry } from './types';

export default createReducer<MilkEntry>(CoreModule.MILK);
