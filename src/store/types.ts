import { DrawerState, Action as DrawerAction } from './modules/drawer/types';
import { NavState, Action as NavAction } from './modules/nav/types';
import { TabState, Action as TabsAction } from './modules/tabs/types';
import { SearchBarState, Action as SearchBarAction } from './modules/searchBar/types';
import { HeaderState, Action as HeaderAction } from './modules/header/types';

/** Global redux state */
export interface State {
  drawer: DrawerState;
  nav: NavState;
  tabs: TabState;
  searchBar: SearchBarState;
  header: HeaderState;
}

/** Global redux action */
export type Action
  = DrawerAction
  | NavAction
  | TabsAction
  | SearchBarAction
  | HeaderAction;
