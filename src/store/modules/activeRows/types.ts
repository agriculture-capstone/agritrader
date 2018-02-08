import { RootAction } from '../../types';

/*----------------------- State -----------------------*/
/** currentFarmer & currentMilkEntryState*/
export interface ActiveRowsState {
  activeTraderUUID: string;
  activeFarmerUUID: string;
  activeMilkEntryUUID: string;
  activeExportEntryUUID: string;
}

/*----------------------- Actions -----------------------*/
/** currentFarmer,  currentMilkEntry, currentTraderEntry & currentExport Action Types */
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
  type: 'DO_NOT_USE',
};
