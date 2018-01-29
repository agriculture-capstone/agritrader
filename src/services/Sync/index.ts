import Config from 'react-native-config';
import { Action as ActionBase } from 'redux';

import { CoreModule, getModulePath } from '../../utils/CoreModule';
import store from '../../store';
import { CoreModuleState, StoreRow, StoreSyncUpdateRow, CoreRow } from '../../store/types';
import CoreAPI from '../../utils/CoreAPI/index';
import * as R from 'ramda';

/**
 * Promise representing the job taking place
 */
type Job = Promise<boolean>;

type Jobs = Promise<boolean[]>;

/*
* A symbol is a primitive type that is guaranteed to be unique. That means
* the only thing that will match this symbol is this exact symbol right here.
* The only way to access the instance of SyncServiceInstance is using this symbol
* defined here.
*
* This is useful to mock out the SyncService during tests
*/
const INSTANCE_ACCESSOR = Symbol('Accessor for instance of SyncService');

/** Default number of seconds between automatic sync */
const DEFAULT_FREQUENCY = 300;

/** Number of milliseconds in a second */
const TO_MILLISECONDS = 1000;

/** The sync frequency for automatic sync */
const SYNC_FREQUENCY = TO_MILLISECONDS * (Config.SYNC_FREQUENCY || DEFAULT_FREQUENCY);

/** Instance of the sync service */
export interface SyncServiceInstance {

  /**
   * Whether the service is currently syncing or not
   */
  readonly syncing: boolean;

  /**
   * Sync all the core modules
   *
   * @returns A promise that resolves when all modules have successfully synced
   */
  syncAll(): Jobs;

  /**
   * Sync the specified module with the core
   *
   * @returns A promise that resolves when module has successfully synced
   */
  syncModule(module: CoreModule): Job;
}

interface CurrentModuleJobs {
  [key: string]: Job | undefined;
}

type SyncCreatePayload<Row> = { row: StoreRow<Row> };
type SyncUpdatePayload<Row> = { row: StoreSyncUpdateRow<Row> };
type EmptyPayload = {};


type SyncActionPayload<Row>
  = SyncCreatePayload<Row>
  | SyncUpdatePayload<Row>
  | EmptyPayload
  ;

export type SyncAction<Row> = SyncActionPayload<Row> & ActionBase;

function createSyncActions<Row>(module: CoreModule) {
  const UPPER_NAME = module.toUpperCase();

  return {
    syncCreateRow: (row: CoreRow<Row>): SyncAction<Row> =>
      ({ row, type: `SYNC_CREATE_${UPPER_NAME}` }),

    syncUpdateRow: (row: StoreSyncUpdateRow<Row>) =>
      ({ row, type: `SYNC_UPDATE_${UPPER_NAME}` }),
  };
}

/**
 * Syncs the specified module, without any concern to whether it is already syncing or not
 *
 * Should only be used by instance if the module is not currently syncing this module
 *
 * @param module Module to sync
 *
 * @returns Promise that resolves when job is over
 */
async function createJob(module: CoreModule): Job {
  const actions = createSyncActions(module);
  const moduleState = (store.getState() as any)[module] as CoreModuleState<{}>;
  const path = getModulePath(module);
  const api = new CoreAPI(path);

  // TODO: Go through store and update local data
  // TODO: Optimize
  const [cleanRows, dirtyRows] = R.partition(R.propEq('status', 'clean'), moduleState.rows);

  // Aggregate requests to create rows
  const remoteCreates = dirtyRows
    .filter(r => r.status === 'local')
    .map(async r => api.create(r))
  ;

  // Aggregate requests to update rows
  const remoteUpdates = dirtyRows
    .filter(r => r.status === 'modified')
    .map(async r => api.update(r))
  ;

  // Aggregate all local requests to remote
  const localToRemoteSync = Promise.all([
    ...remoteCreates,
    ...remoteUpdates,
  ]);

  const remoteToLocalSync = api.getAll().then((remoteRows) => {
    // Get the rows that exist locally
    const exists = R.innerJoin(
      (remoteRows, localRows) => remoteRows.uuid === localRows.uuid,
      remoteRows,
      cleanRows,
    );

    // Get the rows that do not exist locally
    const notExists = R.differenceWith(
      (a, b) => a === b,
      remoteRows,
      exists,
    );

    // Map to appropriate dispatches
    exists.map(r => actions.syncUpdateRow(r));
    notExists.map(r => actions.syncCreateRow({ ...r }));
  });

  { let successStatus: boolean;
    try {
      // Come back when all requests have finished
      await Promise.all([remoteToLocalSync, localToRemoteSync]);
      successStatus = true;
    } catch (err) {
      successStatus = false;
    }

    return successStatus;
  }
}

function createSyncService(): SyncServiceInstance {
  let intervalId: number;

  // Use closure for private variables / methods
  const _p = {
    activeModuleJobs: {} as CurrentModuleJobs,
  };

  const instance: SyncServiceInstance = {

    // A get property will call a function when accessed and return the value
    // Useful for abstracting away logic from the outside
    get syncing() {
      return !!Object.values(_p.activeModuleJobs).length;
    },

    async syncAll(): Jobs {
      // Reset the time for next automatic sync
      clearInterval(intervalId);
      intervalId = setInterval(instance.syncAll, SYNC_FREQUENCY);

      // Forcing the types to work because we know better than Typescript here (be careful)
      const modulesPending = Object.values(CoreModule).map(async m => instance.syncModule(m as CoreModule));

      return Promise.all(modulesPending);
    },

    async syncModule(module: CoreModule) {
      // Check if there is currently an active job for this module, return if so
      const currentJob = _p.activeModuleJobs[module];
      if (currentJob) {
        return currentJob;
      }

      const job = createJob(module);

      // Add job to active module jobs
      _p.activeModuleJobs[module] = job;

      // When job finishes, remove from active module jobs
      job.then(() => {
        delete _p.activeModuleJobs[module];
      });

      return job;
    },
  };

  // Setup interval to sync all modules
  intervalId = setInterval(instance.syncAll, SYNC_FREQUENCY);

  return Object.freeze(instance);
}

/**
 * Accessor for SyncService
 *
 * @returns Singleton instance of SyncService
 */
export default function SyncService(): SyncServiceInstance {
  // Have to force types because Typescript doesn't understand symbols
  if (!(SyncService as any)[INSTANCE_ACCESSOR]) {
    (SyncService as any)[INSTANCE_ACCESSOR] = createSyncService();
  }

  return (SyncService as any)[INSTANCE_ACCESSOR] as SyncServiceInstance;
}
