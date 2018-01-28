import { Action } from './types';

const currentFarmerActions = {
  updateCurrentFarmer: (currentFarmerUUID: string): Action => ({
    currentFarmerUUID,
    type: 'UPDATE_CURRENT_FARMER',
  }),
};

export default currentFarmerActions;
