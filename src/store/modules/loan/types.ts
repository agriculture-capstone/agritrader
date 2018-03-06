import { CoreModuleState, StoreRow } from '../../types';

/*----------------------- Models -----------------------*/

/** Model for a loan entry */
export interface LoanEntry {
  type: 'loan';
  datetime: string;
  toPersonUuid: string;
  fromPersonUuid: string;
  amount: number;
  currency: string;
}

/** Model for a loan entry in store */
export type StoreLoanEntry = StoreRow<LoanEntry>;

/*----------------------- State -----------------------*/

/** Loan module state */
export type LoanState = CoreModuleState<LoanEntry>;
