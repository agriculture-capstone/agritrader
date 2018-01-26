import { Dairy, Action, PartialDairy } from './types';

const dairyActions = {
  updateDairy: (dairy: PartialDairy): Action => ({
    dairy,
    type: 'UPDATE_DAIRY',
  }),

  createDairy: (dairy: Dairy): Action => ({
    dairy,
    type: 'CREATE_DAIRY',
  }),
};

export default dairyActions;
