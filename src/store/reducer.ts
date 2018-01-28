import { combineReducers } from 'redux';

import { State } from './types';
import drawerReducer from './modules/drawer/reducer';
import navReducer from './modules/nav/reducer';
import tabsReducer from './modules/tabs/reducer';
import searchBarReducer from './modules/searchBar/reducer';
import headerReducer from './modules/header/reducer';
import sensitiveInfoReducer from './modules/sensitive/reducer';

import farmerReducer from './modules/farmer/reducer';
import currentFarmerReducer from './modules/currentFarmer/reducer';
import dairyReducer from './modules/dairy/reducer';
import milkReducer from './modules/milk/reducer';


export default combineReducers<State>({
  drawer: drawerReducer,
  nav: navReducer,
  tabs: tabsReducer,
  searchBar: searchBarReducer,
  header: headerReducer,
  sensitiveInfo: sensitiveInfoReducer,
  farmer: farmerReducer,
  currentFarmer: currentFarmerReducer,
  dairy: dairyReducer,
  milk: milkReducer,
});
