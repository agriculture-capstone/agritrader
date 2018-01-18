import { StackNavigator } from 'react-navigation';

import { FakePage } from '../../view/pages/FakePage';
import Farmer from '../../view/pages/Farmer';
import Home from '../../view/pages/Home';

/** Named routes in the application */
export enum Route {
  HOME = 'Home',
  LOGIN = 'Login',
  FARMER = 'Farmer',
}

/** Initial route for appplication */
export const INITIAL_ROUTE = Route.HOME;

/** Top-level navigator for application */
export default StackNavigator({
  [Route.HOME]: {
    screen: Home,
  },
  [Route.FARMER]: {
    screen: Farmer,
  },
}, {
  headerMode: 'none',
  initialRouteName: INITIAL_ROUTE,
});
