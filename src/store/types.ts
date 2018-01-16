import { AppState, Action as AppAction } from './modules/app/types';
import { NavState, Action as NavAction } from './modules/nav/types';
import { TabState, Action as TabsAction } from './modules/tabs/types';
import { ActionCreator } from 'redux';

/** Global redux state */
export interface State {
  app: AppState;
  nav: NavState;
  tabs: TabState;
}

/** Global redux action */
export type Action
  = AppAction
  | NavAction
  | TabsAction;
