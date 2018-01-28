import { Reducer } from 'redux';

import { UserState, Action } from './types';
import initialState from './state';

const userReducer: Reducer<UserState> = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'UPDATE_USER': {
      return {
        ...state,
        currentUser: action.uuidUser,
      };
    }
    case 'UPDATE_FARMER': {
      return {
        ...state,
        currentUser: action.uuidFarmer,
      };
    }
    case 'DELETE_USER': {
      return {
        ...state,
        currentUser: '',
      };
    }
    case 'DELETE_FARMER': {
      return {
        ...state,
        currentUser: '',
      };
    }
    default:
      return state;
  }
};

export default userReducer;
