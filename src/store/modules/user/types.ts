
/*----------------------- State -----------------------*/
/** User State*/
export interface UserState {
  currentUser: string;
  currentFarmer: string;
}

/*----------------------- Actions -----------------------*/
/** User Action Types */
export type Action = {
  type: 'UPDATE_USER',
  uuidUser: string,
} | {
  type: 'UPDATE_FARMER',
  uuidFarmer: string,
} | {
  type: 'DELETE_USER',
} | {
  type: 'DELETE_FARMER',
} | {
  type: 'DO_NOT_USE',
};
