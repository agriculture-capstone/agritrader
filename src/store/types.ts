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

/*----------------------- Global Models -----------------------*/

/** TODO: doc */
export interface CoreState {
  lastModified: string;
  containsLocal: boolean;
}

/** TODO: doc */
interface OptionalCoreData {
  lastModified: string;
  local: string;
}

interface RequiredCoreData {
  uuid: string;
}

export type CoreData<T> = T & OptionalCoreData & RequiredCoreData;

export type PartialCoreData<T> = Partial<T> & Partial<OptionalCoreData> & RequiredCoreData;
