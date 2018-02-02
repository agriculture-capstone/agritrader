import { NavigationState, NavigationAction } from 'react-navigation';
import { RootAction } from '../../types';
import { Route } from '../../../view/navigation/navigator';

/*----------------------- State -----------------------*/

/** Navigation module state */
export type NavState = NavigationState;

/*----------------------- Actions -----------------------*/

/** Navigation module action */
export type Action = NavigationAction | RootAction | {
  type: 'NAV/GO_TO_WITHOUT_HISTORY',
  route: Route,
} | {
  type: 'NAV/GO_TO_DRAWER_ROUTE',
  route: Route,
};
