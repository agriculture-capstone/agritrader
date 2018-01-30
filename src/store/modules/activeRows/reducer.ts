import { Reducer } from 'redux';

import { ActiveRowsState, Action } from './types';
import initialState from './state';

const activeRowReducer: Reducer<ActiveRowsState> = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'UPDATE_CURRENT_FARMER': {
      return {
        ...state,
        activeFarmerUUID : action.currentFarmerUUID,
      };
    }
    case 'CLEAR_CURRENT_FARMER': {
      return {
        ...state,
        activeFarmerUUID : '',
      };
    }
    default:
      return state;
  }
};

export default activeRowReducer;
