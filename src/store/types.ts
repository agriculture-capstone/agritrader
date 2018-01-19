import { AppState, Action as AppAction } from './modules/app/types';
import { NavState, Action as NavAction } from './modules/nav/types';
import { SearchBarState, Action as SearchBarAction } from './modules/searchBar/types';

/** Global redux state */
export interface State {
  app: AppState;
  nav: NavState;
  searchBar: SearchBarState;
}

/** Global redux action */
export type Action
  = AppAction
  | NavAction
  | SearchBarAction;
