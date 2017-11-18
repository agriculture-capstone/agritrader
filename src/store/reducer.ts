import { combineReducers } from 'redux';

import { State } from './types';
import appReducer from './modules/app/reducer';

export default combineReducers<State>({
  app: appReducer,
});
