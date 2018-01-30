/*----------------------- State -----------------------*/
/** currentFarmer State*/
export interface ActiveRowsState {
  activeFarmerUUID: string;
}

/** currentMilkEntry State*/
export interface ActiveRowsState {
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
  type: 'DO_NOT_USE',
};
