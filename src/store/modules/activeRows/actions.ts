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
};

export default activeRowsActions;
