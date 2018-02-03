import { NavigationActions } from 'react-navigation';

import { Route } from '../../../view/navigation/navigator';
import { Action } from './types';

const navActions = {

  goBack: () => NavigationActions.back(),

  navigateTo: (route: Route) => NavigationActions.navigate({
    routeName: route,
  }),

  navigateToWithoutHistory: (route: Route): Action => ({
    route,
    type: 'NAV/GO_TO_WITHOUT_HISTORY',
  }),

  navigateToDrawerRoute: (route: Route): Action => ({
    route,
    type: 'NAV/GO_TO_DRAWER_ROUTE',
  }),
};


export default navActions;
