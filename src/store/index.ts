import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducer';
import { State } from './types';
import CoreAPI from '../utils/CoreAPI';
import { CoreModule } from '../utils/CoreModule/index';

const whitelist = Object.values(CoreModule);

const persistConfig: PersistConfig = {
  storage,
  whitelist,
  key: 'main',
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore<State>(persistedReducer, composeEnhancers(
  applyMiddleware(
    createLogger(),
    thunk.withExtraArgument({ CoreAPI }),
  ),
));

export const persistor = persistStore(store);

export default store;
