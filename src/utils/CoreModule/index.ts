import { Action as ActionBase } from 'redux';

import { CorePath } from '../CoreAPI';
import { StoreLocalCreationRow, StoreLocalUpdateRow } from '../../store/types';

export type CoreModuleName
= 'farmer'
| 'dairy'
| 'loan'
;

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

function createActions<R>(name: CoreModuleName) {
  const upperName = name.toUpperCase();

  return {
    createFarmerLocal: (row: StoreLocalCreationRow<R>): Action<R> =>
    ({ row, type: `CREATE_${upperName}_LOCAL` }),

    createFarmerRemote: (localUUID: string, coreUUID: string, lastModified: string): Action<R> =>
      ({ localUUID, coreUUID, lastModified, type: `CREATE_${upperName}_REMOTE` }),

    updateFarmerLocal: (row: StoreLocalUpdateRow<R>): Action<R> =>
      ({ row, type: `UPDATE_${upperName}_LOCAL` }),

    updateFarmerRemote: (uuid: string, lastModified: string): Action<R> =>
      ({ uuid, lastModified, type: `UPDATE_${upperName}_REMOTE` }),
  };
}

function createThunks() {

}

function createInitialState() {

}

/**
 * Utility to create store modules for data from Agricore
 *
 * @param name Name of the module
 * @param path Path for the module on the core
 */
export function createCoreModule<R>(name: CoreModuleName, path: CorePath) {

}
