import { StackNavigator, NavigationRouteConfigMap } from 'react-navigation';
import * as React from 'react';

import { FakePage } from '../../view/pages/FakePage';

/** Information for each route in app */
export interface RouteInfo {
  name: Route;
  icon: string;
  component: React.ComponentClass | React.StatelessComponent;
  inDrawer: boolean;
}

/** Named routes in the application */
export enum Route {
  HOME = 'Home',
  LOGIN = 'Login',
  FARMER = 'Farmer',
}

/** App route information */
export const routes: RouteInfo[] = [
  {
    name: Route.HOME,
    icon: 'home',
    component: FakePage,
    inDrawer: true,
  },
  {
    name: Route.LOGIN,
    icon: 'person',
    component: FakePage,
    inDrawer: true,
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
export const INITIAL_ROUTE = Route.HOME;

/** Top-level navigator for application */
const navigator = StackNavigator(toNavigatorRoutes(routes), {
  headerMode: 'none',
  initialRouteName: Route.HOME,
});

export default navigator;
