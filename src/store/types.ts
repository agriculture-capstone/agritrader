import { ThunkAction } from 'redux-thunk';

import CoreAPI from '../utils/CoreAPI';
import { DrawerState, Action as DrawerAction } from './modules/drawer/types';
import { NavState, Action as NavAction } from './modules/nav/types';
import { TabState, Action as TabsAction } from './modules/tabs/types';
import { SearchBarState, Action as SearchBarAction } from './modules/searchBar/types';
import { HeaderState, Action as HeaderAction } from './modules/header/types';
import { ActiveRowsState, Action as ActiveRowsAction } from './modules/activeRows/types';
import { SensitiveInfoState, Action as SensitiveAction } from './modules/sensitive/types';
import { FarmerState } from './modules/farmer/types';
import { MilkState } from './modules/milk/types';
import { ExportState } from './modules/export/types';

/** Global redux state */
export interface State {
  drawer: DrawerState;
  nav: NavState;
  tabs: TabState;
  searchBar: SearchBarState;
  header: HeaderState;
  sensitiveInfo: SensitiveInfoState;
  farmer: FarmerState;
  activeRows: ActiveRowsState;
  milk: MilkState;
  export: ExportState;
}

/** Root actions for application */
export type RootAction = {
  type: 'LOGOUT',
} | {
  type: 'LOGIN',
  payload: LoginPayload;
} | {
  type: 'BYPASS_LOGIN',
};

/** Root action models */

export interface LoginPayload {
  jwt: string;
  uuid: string;
}

/** Combine module specific actions with RootAction */
export type ModuleAction<T> = T | RootAction;

/** Global redux action */
export type Action
  = DrawerAction
  | NavAction
  | TabsAction
  | SearchBarAction
  | HeaderAction
  | ActiveRowsAction
  | SensitiveAction
  | RootAction
  ;

/*----------------------- Core Module Models -----------------------*/

/** Status of a row in store */
export type Status
  = 'local'
  | 'modified'
  | 'clean'
  ;

/** Base state for modules synced with core  */
export interface CoreModuleState<T> {
  lastSynced: string;
  isDirty: boolean;
  rows: StoreRow<T>[];
}

interface DataStatus {
  status: Status;
}

interface LastModifiedData {
  lastModified: string;
}

interface UUIDData {
  uuid: string;
}

/**
 * Row as returned by core
 */
export type CoreRow<T> = T & LastModifiedData & UUIDData;

/**
 * Data model in store
 *
 * @template T Data model for module
 */
export type StoreRow<T> = T & DataStatus & LastModifiedData & UUIDData;

/**
 * Data model for local creation
 *
 * @template T Data model for module
 */
export type StoreLocalCreationRow<T> = T & LastModifiedData & UUIDData;

/**
 * Data model for local update
 *
 * @template T Data model for module
 */
export type StoreLocalUpdateRow<T> = Partial<T> & LastModifiedData & UUIDData;

/**
 * Data model for sync update
 *
 * @template T Data model for module
 */
export type CoreSyncUpdateRow<T> = Partial<T> & LastModifiedData & UUIDData;

/**
 * Data model for sending creation request to core
 *
 * @template T Data model for module
 */
export type CoreCreationRequest<T> = T & LastModifiedData & UUIDData;

/**
 * Data model for sending update request to core
 *
 * @template T Data model for module
 */
export type CoreUpdateRequest<T> = Partial<T> & LastModifiedData & UUIDData;

/**
 * Data model for thunk item creation
 *
 * @template T Data model for module
 */
export type ThunkCreationRow<T> = T & Partial<UUIDData>;

/**
 * Data model for thunk item update
 *
 * @template T Data model for module
 */
export type ThunkUpdateRow<T> = Partial<T> & UUIDData;

/**
 * Function definition for thunk
 *
 * @template T Return type of thunk
 */
export type Thunk<T> = ThunkAction<Promise<T>, State, { CoreAPI: typeof CoreAPI }>;

/**
 * Function definition for core module thunks
 */
export type CoreThunk = Thunk<string>;
