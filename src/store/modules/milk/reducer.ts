import { createReducer } from '../../../utils/CoreModule';
import { MilkEntry } from './types';

export default createReducer<MilkEntry>('milk');
