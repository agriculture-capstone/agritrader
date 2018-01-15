import { StackNavigator } from 'react-navigation';

import { FakePage } from '../pages/FakePage';
import { FarmerInformation } from '../pages/FarmerInformation';

/** Named routes in the application */
export enum Route {
  HOME = 'Home',
  LOGIN = 'Login',
  FARMER = 'Farmer',
  FARMER_INFORMATION = 'FarmerInformation',
}

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
