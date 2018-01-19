import { AppState, Action as AppAction } from './modules/app/types';
import { NavState, Action as NavAction } from './modules/nav/types';
import { TabState, Action as TabsAction } from './modules/tabs/types';
import { SearchBarState, Action as SearchBarAction } from './modules/searchBar/types';

/** Global redux state */
export interface State {
  app: AppState;
  nav: NavState;
  tabs: TabState;
  searchBar: SearchBarState;
}

/** Global redux action */
export type Action
  = AppAction
  | NavAction
  | TabsAction
  | SearchBarAction;
