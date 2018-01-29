import { NavigationActions } from 'react-navigation';

import { Route } from '../../../view/navigation/navigator';

const navActions = {

  goBack: () => NavigationActions.back(),

  navigateTo: (route: Route) => {
    if (route === Route.FARMER) {
      throw new Error(`Cannot navigate to ${route} without params, please see alternative navActions`);
    }

    return NavigationActions.navigate({
      routeName: route,
    });
  },

  navigateToFarmer: (route: Route, uuid: string) => NavigationActions.navigate({
    routeName: route,
    params: { uuid },
  }),
};


export default navActions;
