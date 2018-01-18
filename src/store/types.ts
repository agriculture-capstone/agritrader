import { AppState, Action as AppAction } from './modules/app/types';
import { NavState, Action as NavAction } from './modules/nav/types';

/** Global redux state */
export interface State {
  app: AppState;
  nav: NavState;
}

/** Global redux action */
export type Action
  = AppAction
  | NavAction;
