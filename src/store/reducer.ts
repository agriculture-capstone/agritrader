import { combineReducers } from 'redux';
import { BaseReducer } from 'redux-persist';

import { State, Action } from './types';
import drawerReducer from './modules/drawer/reducer';
import navReducer from './modules/nav/reducer';
import tabsReducer from './modules/tabs/reducer';
import searchBarReducer from './modules/searchBar/reducer';
import headerReducer from './modules/header/reducer';
import sensitiveReducer from './modules/sensitive/reducer';

import farmerReducer from './modules/farmer/reducer';
import dairyReducer from './modules/dairy/reducer';

export default combineReducers<State>({
  drawer: drawerReducer,
  nav: navReducer,
  tabs: tabsReducer,
  searchBar: searchBarReducer,
  header: headerReducer,
  sensitive: sensitiveReducer,
  farmer: farmerReducer,
  dairy: dairyReducer,
}) as BaseReducer<State, Action>;
