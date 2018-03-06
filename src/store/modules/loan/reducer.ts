import { createReducer } from '../../../utils/CoreModule';
import { LoanEntry } from './types';

export default createReducer<LoanEntry>('loan');
