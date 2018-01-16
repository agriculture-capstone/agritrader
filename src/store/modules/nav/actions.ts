import { NavigationActions } from 'react-navigation';

import { Route } from '../../../view/navigation/navigator';

function createNavActions() {
  return {

    goBack: () => NavigationActions.back(),

    test: (route: Route) => NavigationActions.navigate({
      routeName: route,
    }),
  };
}

export default createNavActions;
