import { createThunks } from '../../../utils/CoreModule';
import { PaymentEntry } from './types';

const {
  createRow: createPaymentEntry,
  updateRow: updatePaymentEntry,
} = createThunks<PaymentEntry>('payment');

export default {
  createPaymentEntry,
  updatePaymentEntry,
}