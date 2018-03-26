import { createReducer } from '../../../utils/CoreModule';
import { PaymentEntry } from './types';

export default createReducer<PaymentEntry>('payment');
