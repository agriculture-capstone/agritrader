import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';

import rootReducer from './reducer';
import { State } from './types';
import CoreAPI from '../utils/CoreAPI';

const composeEnhancers = (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore<State>(rootReducer, composeEnhancers(
  applyMiddleware(
    createLogger(),
    thunk.withExtraArgument({ CoreAPI }),
  ),
));

/** The persistor to sync store with AsyncStorage/SharedStorage */
export const persistor = persistStore(store);

export default store;
