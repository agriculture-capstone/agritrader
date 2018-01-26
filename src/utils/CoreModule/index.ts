import { CorePath } from '../CoreAPI';

export type CoreModuleName
= 'farmer'
| 'dairy'
| 'loan'
;

function createReducer() {

}

const actions = {

};

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
