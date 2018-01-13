import { NavigationActions } from 'react-navigation';

import { Route } from '@/view/navigation/navigator';

const actions = {

  goBack: () => NavigationActions.back(),

  test: (route: Route) => NavigationActions.navigate({
    routeName: route,
  }),
};

export default actions;
