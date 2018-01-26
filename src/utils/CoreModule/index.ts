import { Action as ActionBase } from 'redux';

import { CorePath } from '../CoreAPI';
import StoreUtils from '../StoreUtils';
import {
  StoreLocalCreationRow,
  StoreLocalUpdateRow,
  StoreRow,
  ThunkCreationRow,
  CoreThunk,
  ThunkUpdateRow,
} from '../../store/types';

export type CoreModuleName
= 'farmer'
| 'dairy'
| 'loan'
;

function isResponse(response: any): response is Response {
  return (response instanceof Response);
}

function rowNotFound<T>(row?: StoreRow<T>): row is undefined {
  return (row === undefined);
}

function createReducer() {

}

type ActionPayload<R> = {
  row: StoreLocalCreationRow<R>,
} | {
  localUUID: string,
  coreUUID: string,
  lastModified: string,
} | {
  row: StoreLocalUpdateRow<R>,
} | {
  uuid: string,
  lastModified: string,
};

type Action<R> = ActionPayload<R> & ActionBase;

function createActions<Row>(name: CoreModuleName) {
  const upperName = name.toUpperCase();

  return {
    createRowLocal: (row: StoreLocalCreationRow<Row>): Action<Row> =>
    ({ row, type: `CREATE_${upperName}_LOCAL` }),

    createRowRemote: (localUUID: string, coreUUID: string, lastModified: string): Action<Row> =>
      ({ localUUID, coreUUID, lastModified, type: `CREATE_${upperName}_REMOTE` }),

    updateRowLocal: (row: StoreLocalUpdateRow<Row>): Action<Row> =>
      ({ row, type: `UPDATE_${upperName}_LOCAL` }),

    updateRowRemote: (uuid: string, lastModified: string): Action<Row> =>
      ({ uuid, lastModified, type: `UPDATE_${upperName}_REMOTE` }),
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

function createInitialState() {

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
