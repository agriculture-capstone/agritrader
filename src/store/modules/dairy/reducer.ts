import { createReducer } from '../../../utils/CoreModule';
import { DairyEntry } from './types';

export default createReducer<DairyEntry>('dairy');
