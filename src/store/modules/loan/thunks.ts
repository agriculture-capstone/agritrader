import { createThunks } from '../../../utils/CoreModule';
import { LoanEntry } from './types';

const {
  createRow: createLoanEntry,
  updateRow: updateLoanEntry,
} = createThunks<LoanEntry>('loan');

export default {
  createLoanEntry,
  updateLoanEntry,
};
