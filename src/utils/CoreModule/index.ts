import { Action as ActionBase, Reducer } from 'redux';

import { CorePath } from '../CoreAPI';
import UTCDate from '../UTCDate';
import StoreUtils from '../StoreUtils';
import { NetworkError } from '../../errors/NetworkError';
import {
  StoreLocalCreationRow,
  StoreLocalUpdateRow,
  StoreRow,
  ThunkCreationRow,
  CoreThunk,
  ThunkUpdateRow,
  CoreModuleState,
  Status,
  CoreSyncUpdateRow,
  CoreRow,
} from '../../store/types';

/*--------------------------------- Utility Types ---------------------------------*/

/** Different core modules */
export enum CoreModule {
  // FARMER MUST COME FIRST IN THE LIST, THIS ORDER SPECIFIES THE ORDER OF THE SYNC
  FARMER = 'farmer',
  MILK = 'milk',
}

/**
 * Get the module path for the specified module
 *
 * @param module Module to retrieve path for
 */
export function getModulePath(module: CoreModule): CorePath {
  switch (module) {
    case CoreModule.FARMER: return CorePath.FARMERS;

    case CoreModule.MILK: return CorePath.MILK;

    default: throw new Error(`No such module/path mapping for module ${module}`);
  }
}

/*-------------------------------- Generic Actions --------------------------------*/

type EmptyPayload = {};

type CreateLocalPayload<Row> = { row: StoreLocalCreationRow<Row> };
type CreateRemotePayload = { uuid: string, lastModified: string };
type UpdateLocalPayload<Row> = { row: StoreLocalUpdateRow<Row> };
type UpdateRemotePayload<Row> = { row: CoreRow<Row> };
type SetLastSyncedPayload = { lastSynced: string };


type SyncCreatePayload<Row> = { row: CoreRow<Row> };
type SyncUpdatePayload<Row> = { row: CoreSyncUpdateRow<Row> };

type ThunkActionPayload<Row>
  = CreateLocalPayload<Row>
  | CreateRemotePayload
  | UpdateLocalPayload<Row>
  | UpdateRemotePayload<Row>
  | SetLastSyncedPayload
  | EmptyPayload
  ;

type SyncActionPayload<Row>
  = SyncCreatePayload<Row>
  | SyncUpdatePayload<Row>
  | EmptyPayload
  ;

export type SyncAction<Row> = SyncActionPayload<Row> & ActionBase;

type ThunkAction<R> = ThunkActionPayload<R> & ActionBase;

/*-------------------------------- Helper Functions -------------------------------*/

function isResponse(response: any): response is Response {
  return (response instanceof Response);
}

function isNetworkError(err: any): err is NetworkError {
  return (err instanceof NetworkError);
}

function rowNotFound<T>(row?: StoreRow<T>): row is undefined {
  return (row === undefined);
}

function deriveIsDirty<T>(rows: StoreRow<T>[]) {
  return rows.some(r => r.status !== 'clean');
}

function createInitialState<Row>(): CoreModuleState<Row> {
  return {
    isDirty: false,
    rows: [] as StoreRow<Row>[],
    lastSynced: UTCDate.OLD_DATE,
  };
}

/*----------------------------------- Action Types ----------------------------------*/

const createRowLocalType = (upperModule: string) => `CREATE_${upperModule}_ROW_LOCAL`;
const createRowRemoteType = (upperModule: string) =>  `CREATE_${upperModule}_ROW_REMOTE`;
const updateRowLocalType = (upperModule: string) =>  `UPDATE_${upperModule}_ROW_LOCAL`;
const updateRowRemoteType = (upperModule: string) =>  `UPDATE_${upperModule}_ROW_REMOTE`;
const setLastSyncedType = (upperModule: string) =>  `SET_${upperModule}_LAST_SYNCED`;

const syncCreateRowType = (upperModule: string) => `SYNC_CREATE_${upperModule}_ROW`;
const syncUpdateRowType = (upperModule: string) => `SYNC_UPDATE_${upperModule}_ROW`;

/*------------------------------------- Actions ------------------------------------*/

function createThunkActions<Row>(module: CoreModule) {
  const upperModule = module.toUpperCase();

  return {
    createRowLocal: (row: StoreLocalCreationRow<Row>): ThunkAction<Row> =>
      ({ row, type: createRowLocalType(upperModule) }),

    createRowRemote: (uuid: string, lastModified: string): ThunkAction<Row> =>
      ({ uuid, lastModified, type: createRowRemoteType(upperModule) }),

    updateRowLocal: (row: StoreLocalUpdateRow<Row>): ThunkAction<Row> =>
      ({ row, type: updateRowLocalType(upperModule) }),

    updateRowRemote: (row: CoreRow<Row>): ThunkAction<Row> =>
      ({ row, type: updateRowRemoteType(upperModule) }),

    setLastSynced: (lastSynced: string): ThunkAction<Row> =>
      ({ lastSynced, type: setLastSyncedType(upperModule) }),
  };
}

export function createSyncActions<Row>(module: CoreModule) {
  const upperModule = module.toUpperCase();

  return {
    syncCreateRow: (row: CoreRow<Row>): SyncAction<Row> =>
      ({ row, type: syncCreateRowType(upperModule) }),

    syncUpdateRow: (row: CoreSyncUpdateRow<Row>) =>
      ({ row, type: syncUpdateRowType(upperModule) }),
  };
}

/*------------------------------- Creation Utilities -------------------------------*/

/**
 * Utility to create reducer for core store module
 *
 * @param name Name of the module
 * @param initialState initialState for application
 */
export function createReducer<Row>(name: CoreModule, initialState = createInitialState<Row>()): Reducer<CoreModuleState<Row>> {
  const upperName = name.toUpperCase();

  return (state = initialState, action: ThunkAction<Row>) => {
    let status: Status, isDirty: boolean;

    switch (action.type) {

      case setLastSyncedType(upperName): return (function (action: SetLastSyncedPayload) {
        const { lastSynced } = action;

        return { ...state, lastSynced };
      })(action as any);

      case createRowLocalType(upperName): return (function (action: CreateLocalPayload<any>) {
        status = 'local';
        isDirty = true;
        const row = { ...action.row, status };
        const rows = [...state.rows, row];

        return { ...state, rows, isDirty };
      })(action as any);

      case createRowRemoteType(upperName): return (function (action: CreateRemotePayload) {
        status = 'clean';
        const { uuid, lastModified } = action;
        const rows = state.rows.map(r => r.uuid === uuid ? { ...(r as any), lastModified, status } : r);
        isDirty = deriveIsDirty(rows);

        return { ...state, rows, isDirty };
      })(action as any);

      case updateRowLocalType(upperName): return (function (action: UpdateLocalPayload<{}>) {
        status = 'modified';
        isDirty = true;
        const { row: tempRow, row: { uuid } } = action;
        const row = { ...tempRow, status };
        const rows = state.rows.map(r => r.uuid === uuid ? { ...(r as any), ...row } : r);

        return { ...state, rows, isDirty };
      })(action as any);

      case updateRowRemoteType(upperName): return (function (action: UpdateRemotePayload<{}>) {
        status = 'clean';
        const { uuid } = action.row;
        const row = { ...action.row, status };
        const rows = state.rows.map(r => r.uuid === uuid ? { ...(r as any), row } : r);

        isDirty = deriveIsDirty(rows);

        return { ...state, rows, isDirty };
      })(action as any);

      case syncCreateRowType(upperName): return (function (action: SyncCreatePayload<Row>) {
        status = 'clean';
        const newRow = { ...(action.row as CoreRow<{}>), status };
        const rows = [...state.rows, newRow];

        return { ...state, rows };
      })(action as any);

      case syncUpdateRowType(upperName): return (function (action: SyncUpdatePayload<Row>) {
        status = 'clean';
        const coreRow = { ...(action.row as CoreSyncUpdateRow<{}>), status };
        const rows = state.rows.map(storeRow => storeRow.uuid === coreRow.uuid ? { ...(storeRow as StoreRow<{}>), ...coreRow } : storeRow);

        return { ...state, rows };
      })(action as any);

      default: {
        return state;
      }
    }
  };
}

/**
 * Utility to create store thunks for core module
 *
 * @param module Name of the module
 * @param path Path for the module on the core
 */
export function createThunks<Row>(module: CoreModule) {
  const { createRowLocal, createRowRemote, updateRowLocal, updateRowRemote } = createThunkActions(module);
  const path = getModulePath(module);

  return {

    /** Create a new row */
    createRow: (newRow: ThunkCreationRow<Row>): CoreThunk => async (dispatch, getState, { CoreAPI }) => {
      const creationRow = StoreUtils.convertCreationRow(newRow);
      const { uuid } = creationRow;

      // Store the local copy
      dispatch(createRowLocal(creationRow));

      // Send the new row to the core
      const api = new CoreAPI(path);

      // Create new block for block scoped variables (let) to avoid errors
      { let lastModified: string;

        // Attempt to create resource on core
        try {
          ({ lastModified } = await api.create(creationRow));
        } catch (err) {
          // Failed to create resource on Core
          if (isResponse(err)) {
            // TODO: Deal with different core errors
            const response = err;
            // tslint:disable-next-line:no-console
            console.error(response.status);

            return uuid;
          } else if (isNetworkError(err)) {
            // Currently no network, let request fail and allow sync service to resolve
            return uuid;
          } else {
            // Not a response error, should be logged
            // TODO: Log me
            // tslint:disable-next-line:no-console
            console.error(err.message || err);
            return uuid;
          }
        }

        // Create updated model and update store
        dispatch(createRowRemote(uuid, lastModified));
        return uuid;
      }
    },

    /** Update an existing row */
    updateRow: (rowUpdate: ThunkUpdateRow<Row>): CoreThunk => async (dispatch, getState, { CoreAPI }) => {
      const { uuid } = rowUpdate;
      const convertedRow = StoreUtils.convertUpdateRow(rowUpdate);

      // Update the row in store
      dispatch(updateRowLocal(convertedRow));

      // Retrieve the updated row
      const updatedRow = (getState() as any)[module].rows.find((f: StoreRow<Row>) => f.uuid === uuid);

      // Deal with no row found
      if (rowNotFound(updatedRow)) {
        // TODO: Deal with me
        // tslint:disable-next-line:no-console
        console.error(`No such row found for uuid: ${uuid}`);
        return uuid;
      }

      // Send update to the core
      const api = new CoreAPI(path);
      const requestRow = StoreUtils.convertToUpdateRequest(updatedRow);

      { let row: CoreRow<Row>;

        try {
          ({ row } = await api.update(requestRow));
        } catch (err) {
          // Failed to create resource on Core
          if (isResponse(err)) {
            // TODO: Deal with different core errors
            const response = err;
            // tslint:disable-next-line:no-console
            console.error(response.status);
            return uuid;
          } else if (isNetworkError(err)) {
            // Currently no network, let request fail and allow sync service to resolve
            return uuid;
          } else {
            // Not a response error, should be logged
            // TODO: Log me
            // tslint:disable-next-line:no-console
            console.error(err.message || err);
            return uuid;
          }
        }

        // TODO: Should be getting the response from core w/ the value of the updated row

        // Create updated model and update store
        dispatch(updateRowRemote(row));
        return uuid;
      }
    },
  };
}
