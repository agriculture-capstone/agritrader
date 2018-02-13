import { createReducer } from '../../../utils/CoreModule';
import { ExportEntry } from './types';

export default createReducer<ExportEntry>('export');
