import { Reducer } from 'redux';
import { BaseReducer, PersistConfig, persistReducer } from 'redux-persist';
import createSensitiveStorage from 'redux-persist-sensitive-storage';

import { Action, SensitiveState } from './types';
import initialState from './state';

const name = 'agritrader';

const sensitiveStorage = createSensitiveStorage({
  keychainService: name,
  sharedPreferencesName: name,
});

const sensitivePersistConfig: PersistConfig = {
  key: 'sensitive',
  storage: sensitiveStorage,
};

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

export default persistReducer(sensitivePersistConfig, sensitiveReducer as BaseReducer<SensitiveState, Action>);
