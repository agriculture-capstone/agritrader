import { Reducer } from 'redux';

import { Action, SensitiveState } from './types';
import initialState from './state';

const sensitiveReducer: Reducer<SensitiveState> = (state = initialState, action: Action) => {

  switch (action.type) {
    case 'SET_JWT': {
      return {
        ...state,
        jwt: action.jwt,
      };
    }

    default: {
      return state;
    }
  }
};

export default sensitiveReducer;
