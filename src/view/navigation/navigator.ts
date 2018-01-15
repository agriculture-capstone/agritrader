import { StackNavigator } from 'react-navigation';

import { FakePage } from '@/view/pages/FakePage';

/** Named routes in the application */
export enum Route {
  HOME = 'Home',
  LOGIN = 'Login',
  FARMER = 'Farmer',
}

/** Top-level navigator for application */
export default StackNavigator({
  [Route.HOME]: {
    screen: FakePage,
  },
}, {
  headerMode: 'none',
  initialRouteName: Route.HOME,
});
