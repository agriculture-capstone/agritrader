import { AppState, Action as AppAction } from './modules/app/types';
import { NavState, Action as NavAction } from './modules/nav/types';
import { ActionCreator } from 'redux';

/** Global redux state */
export interface State {
  app: AppState;
  nav: NavState;
}

/** Global redux action */
export type Action
  = AppAction
  | NavAction;

/** Generic type for actions object */
export interface Actions<T> {
  [key: string]: ActionCreator<T>;
}
