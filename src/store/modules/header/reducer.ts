import { Reducer } from 'redux';

import { HeaderState, Action } from './types';
import initialState from './state';

const headerReducer: Reducer<HeaderState> = (state = initialState, action: Action) => {
  switch (action.type) {

    case 'SET_HEADER_SHOWN':
      return {
        ...state,
        shown: action.shown,
      };

    case 'SET_TITLE':
      return {
        ...state,
        title: action.title,
      };

    default:
      return state;
  }
}

export default headerReducer;
