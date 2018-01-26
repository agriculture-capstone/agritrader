import { Reducer } from 'redux';

import { FarmerState, Action } from './types';
import initialState from './state';

const farmerReducer: Reducer<FarmerState> = (state = initialState, action: Action) => {
  switch (action.type) {

    case 'UPDATE_FARMER': {
      const newFarmers = state.farmers.map((oldFarmer) => {
        return (oldFarmer.uuid === action.farmer.uuid) ?
          { ...oldFarmer, ...action.farmer } :
          oldFarmer;
      });
      return {
        ...state,
        farmers: newFarmers,
      };
    }

    case 'CREATE_FARMER': {
      const newFarmers = [...state.farmers, action.farmer];
      return {
        ...state,
        farmers: newFarmers,
      };
    }

    case 'UPDATE_FARMER_UUID': {
      const newFarmers = state.farmers.map((oldFarmer) => {
        return (oldFarmer.uuid === action.oldUUID) ?
          { ...oldFarmer, ...action.farmer } :
          oldFarmer;
      });

      return {
        ...state,
        farmers: newFarmers,
      };
    }

    default:
      return state;
  }
};

export default farmerReducer;

