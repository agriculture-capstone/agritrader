import { Reducer } from 'redux';

import { LoginState, Action } from './types';
import initialState from './state';

const loginReducer: Reducer<LoginState> = (state = initialState, action: Action) => {
  switch (action.type) {

    case 'SET_USERNAME':
      return {
        ...state,
        username: action.username,
      };

    default:
      return state;
  }
};

export default loginReducer;
