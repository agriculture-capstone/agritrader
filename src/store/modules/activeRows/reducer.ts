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
    case 'UPDATE_CURRENT_MILK_ENTRY': {
      return {
        ...state,
        activeMilkEntryUUID : action.currentMilkEntryUUID,
      };
    }
    case 'CLEAR_CURRENT_MILK_ENTRY': {
      return {
        ...state,
        activeMilkEntryUUID : '',
      };
    }
    case 'UPDATE_CURRENT_TRADER': {
      return {
        ...state,
        activeTraderUUID : action.currentTraderUUID,
      };
    }
    case 'CLEAR_CURRENT_TRADER': {
      return {
        ...state,
        activeTraderUUID : '',
      };
    }
    default:
      return state;
  }
};

export default activeRowReducer;
