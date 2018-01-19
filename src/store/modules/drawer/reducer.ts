import { Reducer } from 'redux';

import { DrawerState, Action } from './types';
import initialState from './state';

const drawerReducer: Reducer<DrawerState> = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'SET_DRAWER_SHOWN':
      return {
        ...state,
        // set to false if drawer is locked
        drawerShown: (state.drawerLocked) ? state.drawerShown : action.shown,
      };

    case 'TOGGLE_DRAWER_SHOWN':
      return {
        ...state,
        drawerShown: (state.drawerLocked) ? state.drawerShown : !state.drawerShown,
      };

    case 'SET_DRAWER_LOCKED':
      return {
        ...state,
        drawerLocked: action.locked,
        drawerShown: false,
      };

    default:
      return state;
  }
};

export default drawerReducer;
