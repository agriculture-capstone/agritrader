import { combineReducers } from 'redux';

import { State } from './types';
import appReducer from './modules/app/reducer';
import navReducer from './modules/nav/reducer';
import searchBarReducer from './modules/searchBar/reducer';

export default combineReducers<State>({
  app: appReducer,
  nav: navReducer,
  searchBar: searchBarReducer,
});
