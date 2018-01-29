import { combineReducers } from 'redux';
import { BaseReducer, persistReducer as createPersistedReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { State, Action } from './types';
import { CoreModule } from '../utils/CoreModule/index';

import drawerReducer from './modules/drawer/reducer';
import navReducer from './modules/nav/reducer';
import tabsReducer from './modules/tabs/reducer';
import searchBarReducer from './modules/searchBar/reducer';
import headerReducer from './modules/header/reducer';
import sensitiveInfoReducer from './modules/sensitive/reducer';

import farmerReducer from './modules/farmer/reducer';
import currentFarmerReducer from './modules/currentFarmer/reducer';
import milkReducer from './modules/milk/reducer';

// Whitelist the core modules
const whitelist = Object.values(CoreModule);

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
  currentFarmer: currentFarmerReducer,
  milk: milkReducer,
}) as BaseReducer<State, Action>;

export default createPersistedReducer(persistConfig, reducer);

