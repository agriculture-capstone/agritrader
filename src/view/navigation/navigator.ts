import { StackNavigator, NavigationRouteConfigMap } from 'react-navigation';
import * as React from 'react';

import HomePage from '../pages/Home';
import FarmerPage from '../pages/Farmer';
import ExportsPage from '../pages/Exports';
import LoginPage from '../pages/Login';
import FarmerSearch from '../pages/FarmerSearch';

/** Different types of pages */
export type PageType = 'menu' | 'back' | 'empty';

/** Information for each route in app */
export interface RouteInfo {
  name: Route;
  icon: string;
  component: React.ComponentClass | React.StatelessComponent;
  inDrawer: boolean;
  type: PageType;
  search: boolean;
}

/** Named routes in the application */
export enum Route {
  HOME = 'Home',
  LOGIN = 'Login',
  EXPORTS = 'Exports',
  FARMER = 'FarmerInfo',
  SEARCH_FARMER = 'Farmers',
}

/** App route information */
export const routes: RouteInfo[] = [
  {
    name: Route.LOGIN,
    icon: 'person',
    component: LoginPage,
    inDrawer: false,
    type: 'empty',
    search: false,
  },
  {
    name: Route.HOME,
    icon: 'home',
    component: HomePage,
    inDrawer: true,
    type: 'menu',
    search: false,
  },
  {
    name: Route.FARMER,
    icon: 'person',
    component: FarmerPage,
    inDrawer: false,
    type: 'menu',
    search: false,
  },
  {
    name: Route.SEARCH_FARMER,
    icon: 'people',
    component: FarmerSearch,
    inDrawer: true,
    type: 'back',
    search: true,
  },
  {
    name: Route.EXPORTS,
    icon: 'person',
    component: ExportsPage,
    inDrawer: true,
    type: 'menu',
    search: false,
  },
];

/** Convert IRoute[] to a NavigationRouteConfigMap */
function toNavigatorRoutes(routes: RouteInfo[]): NavigationRouteConfigMap {
  return routes.map(route => ({
    [route.name]: {
      screen: route.component,
    },
  })).reduce((a, b) => ({ ...a, ...b }));
}

/** Initial route for appplication */
export const INITIAL_ROUTE = Route.LOGIN;

/** Top-level navigator for application */
const navigator = StackNavigator(toNavigatorRoutes(routes), {
  headerMode: 'none',
  initialRouteName: INITIAL_ROUTE,
});

export default navigator;

