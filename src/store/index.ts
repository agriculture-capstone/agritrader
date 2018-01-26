import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from './reducer';
import { State } from './types';
import CoreAPI from '../utils/CoreAPI';

const composeEnhancers = (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore<State>(reducer, composeEnhancers(
  applyMiddleware(
    createLogger(),
    thunk.withExtraArgument({ CoreAPI }),
  ),
));

export default store;
