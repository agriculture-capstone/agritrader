import { AppState, Action as AppAction } from './modules/app/types';
import { NavState, Action as NavAction } from './modules/nav/types';

export interface State {
  app: AppState;
  nav: NavState;
}

export type Action
  = AppAction
  | NavAction;
