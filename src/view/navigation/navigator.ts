import { StackNavigator, NavigationRouteConfigMap } from 'react-navigation';
import * as React from 'react';

<<<<<<< HEAD
import HomePage from '../pages/Home';
import FarmerPage from '../pages/Farmer';
import LoginPage from '../pages/Login';

/** Information for each route in app */
export interface RouteInfo {
  name: Route;
  icon: string;
  component: React.ComponentClass | React.StatelessComponent;
  inDrawer: boolean;
}
=======
import { FakePage } from '../../view/pages/FakePage';
import Farmer from '../../view/pages/Farmer';
import Exports from '../../view/pages/Exports';

>>>>>>> james/AT-62/exports-page

/** Named routes in the application */
export enum Route {
  HOME = 'Home',
  LOGIN = 'Login',
  FARMER = 'Farmer',
  EXPORTS = 'Exports',
}

/** App route information */
export const routes: RouteInfo[] = [
  {
    name: Route.HOME,
    icon: 'home',
    component: HomePage,
    inDrawer: true,
  },
  {
    name: Route.FARMER,
    icon: 'person',
    component: FarmerPage,
    inDrawer: true,
  },
  {
    name: Route.LOGIN,
    icon: 'person',
    component: LoginPage,
    inDrawer: false,
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
<<<<<<< HEAD
export const INITIAL_ROUTE = Route.LOGIN;

/** Top-level navigator for application */
const navigator = StackNavigator(toNavigatorRoutes(routes), {
=======
export const INITIAL_ROUTE = Route.EXPORTS;

/** Top-level navigator for application */
export default StackNavigator({
  [Route.HOME]: {
    screen: FakePage,
  },
  [Route.FARMER]: {
    screen: Farmer,
  },
  [Route.EXPORTS]: {
    screen: Exports,
  },
}, {
>>>>>>> james/AT-62/exports-page
  headerMode: 'none',
  initialRouteName: INITIAL_ROUTE,
});

export default navigator;
