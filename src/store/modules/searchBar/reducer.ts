import { Reducer } from 'redux';
import { SearchBarState, Action } from './types';


const searchBarReducer: Reducer<SearchBarState> = (state, action: Action) => {
  switch (action.type) {

    case 'SHOW_SEARCH_BAR':

    case 'SET_SEARCH_BAR_VALUE':

    case 'HIDE_SEARCH_BAR':


    default:
      return state;
  }
};
