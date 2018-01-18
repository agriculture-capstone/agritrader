import { StackNavigator } from 'react-navigation';

import { FakePage } from '../../view/pages/FakePage';
import Farmer from '../../view/pages/Farmer';
import Exports from '../../view/pages/Exports';


/** Named routes in the application */
export enum Route {
  HOME = 'Home',
  LOGIN = 'Login',
  FARMER = 'Farmer',
  EXPORTS = 'Exports',
}

/** Initial route for appplication */
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
  headerMode: 'none',
  initialRouteName: INITIAL_ROUTE,
});
