/*----------------------- State -----------------------*/
/** currentFarmer State*/
export interface ActiveRowsState {
  activeFarmerUUID: string;
}

/*----------------------- Actions -----------------------*/
/** currentFarmer Action Types */
export type Action = {
  type: 'UPDATE_CURRENT_FARMER',
  currentFarmerUUID: string,
} | {
  type: 'CLEAR_CURRENT_FARMER',
} | {
  type: 'DO_NOT_USE',
};
