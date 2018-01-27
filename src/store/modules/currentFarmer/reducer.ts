import { Reducer } from 'redux';

import { currentFarmerState, Action } from './types';
import initialState from './state';

const currentFarmerReducer: Reducer<currentFarmerState> = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'UPDATE_CURRENT_FARMER': {
      return {
        ...state,
        currentFarmerUUID : action.currentFarmerUUID,
      };
    }
    default:
      return state;
  }
};

export default currentFarmerReducer;
