import { ThunkAction } from 'redux-thunk';

import CoreAPI from '../utils/CoreRequest';
import { DrawerState, Action as DrawerAction } from './modules/drawer/types';
import { NavState, Action as NavAction } from './modules/nav/types';
import { TabState, Action as TabsAction } from './modules/tabs/types';
import { SearchBarState, Action as SearchBarAction } from './modules/searchBar/types';
import { HeaderState, Action as HeaderAction } from './modules/header/types';
import { FarmerState, Action as FarmerAction } from './modules/farmer/types';
import { SensitiveState, Action as SensitiveAction } from './modules/sensitive/types';

/** Global redux state */
export interface State {
  drawer: DrawerState;
  nav: NavState;
  tabs: TabState;
  searchBar: SearchBarState;
  header: HeaderState;
  farmer: FarmerState;
  sensitive: SensitiveState;
}

/** Global redux action */
export type Action
  = DrawerAction
  | NavAction
  | TabsAction
  | SearchBarAction
  | HeaderAction
  | FarmerAction
  | SensitiveAction
  ;

/*----------------------- Global Models -----------------------*/

export type Status
  = 'local'
  | 'modified'
  | 'clean'
  ;

/** Base state for modules synced with core  */
export interface CoreState {
  lastModified: string;
  dirty: boolean;
}

interface OptionalCoreData {
  lastModified: string;
  status: Status;
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
 * Used for action updates
 *
 * @template T Model for data to be synced with core
 */
export type PartialCoreData<T> = Partial<T> & Partial<OptionalCoreData> & RequiredCoreData;

/**
 * Partial data model containing only ID
 *
 * Used for thunk updates
 *
 * @template T Model for data to be synced with core
 */
export type IdCoreData<T> = Partial<T> & RequiredCoreData;

export type Thunk<T> = ThunkAction<T, State, { CoreAPI: typeof CoreAPI }>;
export type CoreThunk = Thunk<Promise<void>>;
