import { Reducer } from 'redux';

import { Action, SensitiveState } from './types';

const sensitiveReducer: Reducer<SensitiveState> = (state, action: Action) => {

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
