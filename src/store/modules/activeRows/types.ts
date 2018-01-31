/*----------------------- State -----------------------*/
/** currentFarmer & currentMilkEntryState*/
export interface ActiveRowsState {
  activeTraderUUID: string;
  activeFarmerUUID: string;
  activeMilkEntryUUID: string;
}

/*----------------------- Actions -----------------------*/
/** currentFarmer & currentMilkEntry Action Types */
export type Action = {
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
  type: 'DO_NOT_USE',
};
