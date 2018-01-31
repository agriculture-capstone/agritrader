import { Action } from './types';

const activeRowsActions = {
  setActiveFarmer: (currentFarmerUUID: string): Action => ({
    currentFarmerUUID,
    type: 'UPDATE_CURRENT_FARMER',
  }),
  clearActiveFarmer: (): Action => ({
    type: 'CLEAR_CURRENT_FARMER',
  }),
};

export default activeRowsActions;
