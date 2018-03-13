import { StackNavigator, NavigationRouteConfigMap } from 'react-navigation';

import { RouteInfo, routesInfo, Route } from './routes';

/** Convert IRoute[] to a NavigationRouteConfigMap for consumtion by StackNavigator */
function toNavigatorRoutes(routesInfo: RouteInfo[]): NavigationRouteConfigMap {
  return routesInfo.map(routeInfo => ({
    [routeInfo.route]: {
      screen: routeInfo.component,
    },
  })).reduce((a, b) => ({ ...a, ...b }));
}

/** Initial route for appplication */
export const INITIAL_ROUTE = Route.HOME;

/** Top-level navigator for application */
const navigator = StackNavigator(toNavigatorRoutes(routesInfo), {
  headerMode: 'none',
  initialRouteName: INITIAL_ROUTE,
});

export default navigator;

