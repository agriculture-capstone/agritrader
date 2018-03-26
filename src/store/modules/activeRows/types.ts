import { RootAction } from '../../types';

/*----------------------- State -----------------------*/
/** currentFarmer & currentMilkEntryState*/
export interface ActiveRowsState {
  activeTraderUUID: string;
  activeFarmerUUID: string;
  activeMilkEntryUUID: string;
  activeExportEntryUUID: string;
  activeLoanEntryUUID: string;
  activePaymentEntryUUID: string;
}

/*----------------------- Actions -----------------------*/
/** currentFarmer,  currentMilkEntry, currentTrader & currentExportEntry Action Types */
export type Action = RootAction | {
  type: 'UPDATE_CURRENT_FARMER',
  currentFarmerUUID: string,
} | {
  type: 'CLEAR_CURRENT_FARMER',
} | {
  type: 'UPDATE_CURRENT_MILK_ENTRY',
  currentMilkEntryUUID: string,
} | {
  type: 'CLEAR_CURRENT_MILK_ENTRY',
} | {
  type: 'UPDATE_CURRENT_TRADER',
  currentTraderUUID: string,
} | {
  type: 'CLEAR_CURRENT_TRADER',
} | {
  type: 'UPDATE_CURRENT_EXPORT_ENTRY',
  currentExportEntryUUID: string,
} | {
  type: 'CLEAR_CURRENT_EXPORT_ENTRY',
} | {
  type: 'UPDATE_CURRENT_LOAN_ENTRY',
  currentLoanEntryUUID: string,
} | {
  type: 'CLEAR_CURRENT_LOAN_ENTRY',
} | {
  type: 'UPDATE_CURRENT_PAYMENT_ENTRY',
  currentPaymentEntryUUID: string,
} | {
  type: 'CLEAR_CURRENT_PAYMENT_ENTRY',
} | {
  type: 'DO_NOT_USE',
};
