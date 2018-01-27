import { Farmer, Action, PartialFarmer } from './types';

const farmerActions = {
  updateFarmer: (farmer: PartialFarmer): Action => ({
    farmer,
    type: 'UPDATE_FARMER',
  }),

  createFarmer: (farmer: Farmer): Action => ({
    farmer,
    type: 'CREATE_FARMER',
  }),
};

export default farmerActions;
