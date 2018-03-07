import { Action } from './types';

const activeRowsActions = {
  setActiveFarmer: (currentFarmerUUID: string): Action => ({
    currentFarmerUUID,
    type: 'UPDATE_CURRENT_FARMER',
  }),
  clearActiveFarmer: (): Action => ({
    type: 'CLEAR_CURRENT_FARMER',
  }),
  setActiveMilkEntry: (currentMilkEntryUUID: string): Action => ({
    currentMilkEntryUUID,
    type: 'UPDATE_CURRENT_MILK_ENTRY',
  }),
  clearActiveMilkEntry: (): Action => ({
    type: 'CLEAR_CURRENT_MILK_ENTRY',
  }),
  setActiveExportEntry: (currentExportEntryUUID: string): Action => ({
    currentExportEntryUUID,
    type: 'UPDATE_CURRENT_EXPORT_ENTRY',
  }),
  clearActiveExportEntry: (): Action => ({
    type: 'CLEAR_CURRENT_EXPORT_ENTRY',
  }),
  setActiveLoanEntry: (currentLoanEntryUUID: string): Action => ({
    currentLoanEntryUUID,
    type: 'UPDATE_CURRENT_LOAN_ENTRY',
  }),
  clearActiveLoanEntry: (): Action => ({
    type: 'CLEAR_CURRENT_LOAN_ENTRY',
  }),
  setActiveTrader: (currentTraderUUID: string): Action => ({
    currentTraderUUID,
    type: 'UPDATE_CURRENT_TRADER',
  }),
  clearActiveTrader: (): Action => ({
    type: 'CLEAR_CURRENT_TRADER',
  }),
};
export default activeRowsActions;
