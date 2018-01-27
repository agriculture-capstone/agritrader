import { DrawerState, Action as DrawerAction } from './modules/drawer/types';
import { NavState, Action as NavAction } from './modules/nav/types';
import { TabState, Action as TabsAction } from './modules/tabs/types';
import { SearchBarState, Action as SearchBarAction } from './modules/searchBar/types';
import { HeaderState, Action as HeaderAction } from './modules/header/types';
import { FarmerState, Action as FarmerAction } from './modules/farmer/types';
import { DairyState, Action as DairyAction } from './modules/dairy/types';

/** Global redux state */
export interface State {
  drawer: DrawerState;
  nav: NavState;
  tabs: TabState;
  searchBar: SearchBarState;
  header: HeaderState;
  farmer: FarmerState;
  dairy: DairyState;
}

/** Global redux action */
export type Action
  = DrawerAction
  | NavAction
  | TabsAction
  | SearchBarAction
  | HeaderAction
  | FarmerAction
  | DairyAction
  ;

/*----------------------- Global Models -----------------------*/

/** Base state for modules synced with core  */
export interface CoreState {
  lastModified: string;
  containsLocal: boolean;
}

interface OptionalCoreData {
  lastModified: string;
  local: string;
}

interface RequiredCoreData {
  uuid: string;
}

/**
 * Data model for data synced with core
 *
 * @template T Model for data to be synced with core
 */
export type CoreData<T> = T & OptionalCoreData & RequiredCoreData;

/**
 * Partial data model for data synced with core
 *
 * Used for updates
 *
 * @template T Model for data to be synced with core
 */
export type PartialCoreData<T> = Partial<T> & Partial<OptionalCoreData> & RequiredCoreData;
