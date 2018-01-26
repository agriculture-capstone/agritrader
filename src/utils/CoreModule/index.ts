import { Action as ActionBase, Reducer } from 'redux';

import { CorePath } from '../CoreAPI';
import UTCDate from '../UTCDate';
import StoreUtils from '../StoreUtils';
import {
  StoreLocalCreationRow,
  StoreLocalUpdateRow,
  StoreRow,
  ThunkCreationRow,
  CoreThunk,
  ThunkUpdateRow,
  CoreModuleState,
  Status,
} from '../../store/types';

/*--------------------------------- Utility Types ---------------------------------*/

export type CoreModuleName
  = 'farmer'
  | 'dairy'
  | 'loan'
  ;

/*-------------------------------- Generic Actions --------------------------------*/

type CreateLocalPayload<Row> = { row: StoreLocalCreationRow<Row> };
type CreateRemotePayload = { localUUID: string, coreUUID: string, lastModified: string };
type UpdateLocalPayload<Row> = { row: StoreLocalUpdateRow<Row> };
type UpdateRemotePayload = { uuid: string, lastModified: string };


type ActionPayload<Row>
  = CreateLocalPayload<Row>
  | CreateRemotePayload
  | UpdateLocalPayload<Row>
  | UpdateRemotePayload
  ;

type Action<R> = ActionPayload<R> & ActionBase;

/*-------------------------------- Helper Functions -------------------------------*/

function isResponse(response: any): response is Response {
  return (response instanceof Response);
}

function rowNotFound<T>(row?: StoreRow<T>): row is undefined {
  return (row === undefined);
}

function deriveIsDirty<T>(rows: StoreRow<T>[]) {
  return rows.some(r => r.status !== 'clean');
}

/*------------------------------- Creation Utilities -------------------------------*/

function createReducer<Row>(name: CoreModuleName, initialState: CoreModuleState<Row>): Reducer<CoreModuleState<Row>> {
  const UPPER_NAME = name.toUpperCase();

  return (state = initialState, action: Action<Row>) => {
    let status: Status, isDirty: boolean;

    switch (action.type) {

      case `CREATE_${UPPER_NAME}_LOCAL`: (function (action: CreateLocalPayload<any>) {
        status = 'local';
        isDirty = true;
        const rows = { ...action.row, status };
        const farmers = [...state.rows, rows];

        return { ...state, farmers, isDirty };
      })(action as any);

      case `CREATE_${UPPER_NAME}_REMOTE`: (function (action: CreateRemotePayload) {
        status = 'clean';
        const { coreUUID: uuid, lastModified } = action;
        const rows = state.rows.map(r => r.uuid === action.localUUID ? { ...(r as any), uuid, lastModified } : r);
        isDirty = deriveIsDirty(rows);

        return { ...state, rows, isDirty };
      })(action as any);

      case `UPDATE_${UPPER_NAME}_LOCAL`: (function (action: UpdateLocalPayload<any>) {
        status = 'modified';
        isDirty = true;
        const { row: tempRow, row: { uuid } } = action;
        const row = { ...tempRow, status };
        const rows = state.rows.map(r => r.uuid === uuid ? { ...(r as any), ...row } : r);

        return { ...state, rows, isDirty };
      })(action as any);

      case `UPDATE_${UPPER_NAME}_REMOTE`: (function (action: UpdateRemotePayload) {
        status = 'clean';
        const { uuid, lastModified } = action;
        const rows = state.rows.map(r => r.uuid === uuid ? { ...(r as any), uuid, lastModified, status } : r);
        isDirty = deriveIsDirty(rows);

        return { ...state, rows };
      })(action as any);

      default:
        return state;
    }
  };
}

function createActions<Row>(name: CoreModuleName) {
  const UPPER_NAME = name.toUpperCase();

  return {
    createRowLocal: (row: StoreLocalCreationRow<Row>): Action<Row> =>
    ({ row, type: `CREATE_${UPPER_NAME}_LOCAL` }),

    createRowRemote: (localUUID: string, coreUUID: string, lastModified: string): Action<Row> =>
      ({ localUUID, coreUUID, lastModified, type: `CREATE_${UPPER_NAME}_REMOTE` }),

    updateRowLocal: (row: StoreLocalUpdateRow<Row>): Action<Row> =>
      ({ row, type: `UPDATE_${UPPER_NAME}_LOCAL` }),

    updateRowRemote: (uuid: string, lastModified: string): Action<Row> =>
      ({ uuid, lastModified, type: `UPDATE_${UPPER_NAME}_REMOTE` }),
  };
}

function createThunks<Row>(name: CoreModuleName, path: CorePath) {
  const { createRowLocal, createRowRemote, updateRowLocal, updateRowRemote } = createActions(name);

  return {

    /** Create a new row */
    createRow: (newRow: ThunkCreationRow<Row>): CoreThunk => async (dispatch, getState, { CoreAPI }) => {
      const storeCreationRow = StoreUtils.convertCreationRow(newRow);
      const { uuid: localUUID } = storeCreationRow;

      // Store the local copy
      dispatch(createRowLocal(storeCreationRow));

      // Send the new row to the core
      const api = new CoreAPI(path);
      const requestRow = StoreUtils.convertToCreateRequest(storeCreationRow);

      // Create new block for block scoped variables (let) to avoid errors
      { let coreUUID: string, lastModified: string;

        // Attempt to create resource on core
        try {
          ({ lastModified, uuid: coreUUID } = await api.create(requestRow));
        } catch (err) {
          // Failed to create resource on Core
          if (isResponse(err)) {
            // TODO: Deal with different core errors
            const response = err;
            // tslint:disable-next-line:no-console
            console.log(response.status);
            return;
          } else {
            // Not a response error, should be logged
            // TODO: Log me
            // tslint:disable-next-line:no-console
            console.log(err.message || err);
            return;
          }
        }

        // Create updated model and update store
        dispatch(createRowRemote(localUUID, coreUUID, lastModified));
      }
    },

    /** Update an existing row */
    updateRow: (rowUpdate: ThunkUpdateRow<Row>): CoreThunk => async (dispatch, getState, { CoreAPI }) => {
      const { uuid } = rowUpdate;
      const convertedRow = StoreUtils.convertUpdateRow(rowUpdate);

      // Update the row in store
      dispatch(updateRowLocal(convertedRow));

      // Retrieve the updated row
      const updatedRow = getState()[name].rows.find(f => f.uuid === uuid);

      // Deal with no row found
      if (rowNotFound(updatedRow)) {
        // TODO: Deal with me
        return;
      }

      // Send update to the core
      const api = new CoreAPI(path);
      const requestRow = StoreUtils.convertToUpdateRequest(updatedRow);

      { let lastModified: string;

        try {
          ({ lastModified } = await api.update(requestRow));
        } catch (err) {
          // Failed to create resource on Core
          if (isResponse(err)) {
            // TODO: Deal with different core errors
            const response = err;
            // tslint:disable-next-line:no-console
            console.log(response.status);
            return;
          } else {
            // Not a response error, should be logged
            // TODO: Log me
            // tslint:disable-next-line:no-console
            console.log(err.message || err);
            return;
          }
        }

        // Create updated model and update store
        dispatch(updateRowRemote(uuid, lastModified));
      }
    },
  };
}

function createInitialState<Row>(): CoreModuleState<Row> {
  return {
    isDirty: false,
    rows: [] as StoreRow<Row>[],
    lastModified: UTCDate.OLD_DATE,
  };
}

/**
 * Utility to create store modules for data from Agricore
 *
 * @param name Name of the module
 * @param path Path for the module on the core
 */
function createCoreModule<R>(name: CoreModuleName, path: CorePath) {

}

export default createCoreModule;
