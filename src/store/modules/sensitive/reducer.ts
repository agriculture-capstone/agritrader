import { Reducer } from 'redux';

import { Action, SensitiveInfoState } from './types';
import initialState from './state';

const sensitiveInfoReducer: Reducer<SensitiveInfoState> = (state = initialState, action: Action) => {

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

export default sensitiveInfoReducer;
