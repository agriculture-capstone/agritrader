/*----------------------- State -----------------------*/
/** currentFarmer State*/
export interface currentFarmerState{
  currentFarmerUUID: string;
}

/*----------------------- Actions -----------------------*/
/** currentFarmer Action Types */
export type Action = {
  type: 'UPDATE_CURRENT_FARMER',
  currentFarmerUUID: string,
} |  {
  type: 'DO_NOT_USE',
}; 
