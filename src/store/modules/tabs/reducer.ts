import { Reducer } from 'redux';

import { TabState, Action } from './types';
import initialState from './state';

const tabsReducer: Reducer<TabState> = (state = initialState, action: Action) => {
  switch (action.type) {

    case 'CLEAR_TABS':
      return {
        ...state,
        activeTab: null,
        tabs: [],
      };

    case 'SET_ACTIVE_TAB':
      return {
        ...state,
        activeTab: action.activeTab,
      };

    case 'SET_TABS':
      return {
        ...state,
        tabs: action.tabs,
        activeTab: action.tabs[0],
      };

    default:
      return state;
  }
};

export default tabsReducer;
