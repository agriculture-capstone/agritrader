import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';

import reducer from './reducer';
import { State } from './types';

const composeEnhancers = (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore<State>(reducer, composeEnhancers(
  applyMiddleware(createLogger()),
));

export default store;
