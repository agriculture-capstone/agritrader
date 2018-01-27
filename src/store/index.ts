import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducer from './reducer';
import { State } from './types';
import CoreAPI from '../utils/CoreAPI';
import { CoreModule } from '../utils/CoreModule/index';

const whitelist = [...Object.values(CoreModule), 'sensitive'];

const persistConfig: PersistConfig = {
  storage,
  whitelist,
  key: 'root',
};

const persistedReducer = persistReducer(persistConfig, reducer);

const composeEnhancers = (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore<State>(persistedReducer, composeEnhancers(
  applyMiddleware(
    createLogger(),
    thunk.withExtraArgument({ CoreAPI }),
  ),
));

export const persistor = persistStore(store);

export default store;
