import { StackNavigator } from 'react-navigation';

import { FakePage } from '../../view/pages/FakePage';
import { FarmerInformation } from '../../view/pages/FarmerInformation';

/** Named routes in the application */
export enum Route {
  HOME = 'Home',
  LOGIN = 'Login',
  FARMER = 'Farmer',
  FARMER_INFORMATION = 'FarmerInformation',
}

/** Initial route for appplication */
export const INITIAL_ROUTE = Route.FARMER_INFORMATION;

/** Top-level navigator for application */
export default StackNavigator({
  [Route.HOME]: {
    screen: FakePage,
  },
  [Route.FARMER_INFORMATION]: {
    screen: FarmerInformation,
  },
}, {
  headerMode: 'none',
  initialRouteName: Route.FARMER_INFORMATION,
});
