import { combineReducers } from 'redux';
import { BaseReducer, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { State, Action } from './types';
import { CoreModule } from '../utils/CoreModule/index';

import drawerReducer from './modules/drawer/reducer';
import navReducer from './modules/nav/reducer';
import tabsReducer from './modules/tabs/reducer';
import searchBarReducer from './modules/searchBar/reducer';
import headerReducer from './modules/header/reducer';
import sensitiveReducer from './modules/sensitive/reducer';

import farmerReducer from './modules/farmer/reducer';
import dairyReducer from './modules/dairy/reducer';

const whitelist = Object.values(CoreModule);

const persistConfig: PersistConfig = {
  storage,
  whitelist,
  key: 'root',
};


const reducer = combineReducers<State>({
  drawer: drawerReducer,
  nav: navReducer,
  tabs: tabsReducer,
  searchBar: searchBarReducer,
  header: headerReducer,
  sensitive: sensitiveReducer,
  farmer: farmerReducer,
  dairy: dairyReducer,
}) as BaseReducer<State, Action>;

export default persistReducer(persistConfig, reducer);

