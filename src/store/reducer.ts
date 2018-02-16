import { combineReducers } from 'redux';
import { BaseReducer, persistReducer as createPersistedReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { State, Action } from './types';
import { CoreModuleNames } from '../utils/CoreModule/index';

import drawerReducer from './modules/drawer/reducer';
import navReducer from './modules/nav/reducer';
import tabsReducer from './modules/tabs/reducer';
import searchBarReducer from './modules/searchBar/reducer';
import headerReducer from './modules/header/reducer';
import sensitiveInfoReducer from './modules/sensitive/reducer';

import farmerReducer from './modules/farmer/reducer';
import activeRowsReducer from './modules/activeRows/reducer';
import milkReducer from './modules/milk/reducer';
import exportReducer from './modules/export/reducer';


// Whitelist the core modules
const whitelist = [...CoreModuleNames, 'activeRows'];

// Create persist config using AsyncStorage for root
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
  sensitiveInfo: sensitiveInfoReducer,
  farmer: farmerReducer,
  activeRows: activeRowsReducer,
  milk: milkReducer,
  export: exportReducer,
}) as BaseReducer<State, Action>;

export default createPersistedReducer(persistConfig, reducer);

