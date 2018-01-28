import { Reducer } from 'redux';
import { BaseReducer, PersistConfig, persistReducer } from 'redux-persist';
import createSensitiveStorage from 'redux-persist-sensitive-storage';

import { Action, SensitiveInfoState } from './types';
import initialState from './state';

const name = 'agritrader';

const sensitiveStorage = createSensitiveStorage({
  keychainService: name,
  sharedPreferencesName: name,
});

const sensitivePersistConfig: PersistConfig = {
  key: 'sensitiveInfo',
  storage: sensitiveStorage,
};

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

export default persistReducer(sensitivePersistConfig, sensitiveInfoReducer as BaseReducer<SensitiveInfoState, Action>);
