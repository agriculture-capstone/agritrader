import { createReducer, CoreModule } from '../../../utils/CoreModule';
import { DairyEntry } from './types';

export default createReducer<DairyEntry>(CoreModule.DAIRY);
