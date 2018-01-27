import { Reducer } from 'redux';

import { DairyState, Action } from './types';
import initialState from './state';

const dairyReducer: Reducer<DairyState> = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'UPDATE_DAIRY': {
      const newDairyList = state.dairyList.map((oldDairy) => {
        return (oldDairy.uuid === action.dairy.uuid) ?
          { ...oldDairy, ...action.dairy } :
          oldDairy;
      });
      return {
        ...state,
        dairyList: newDairyList,
      };
    }
    case 'CREATE_DAIRY': {
      const newDairyList = [...state.dairyList, action.dairy];
      return { ...state, dairyList: newDairyList };
    }
    default:
      return state;
  }
};

export default dairyReducer;
