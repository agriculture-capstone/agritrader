import Config from 'react-native-config';
import * as R from 'ramda';

import { CoreModule, getModulePath, createThunks, createSyncActions } from '../../utils/CoreModule';
import store from '../../store';
import { CoreModuleState } from '../../store/types';
import CoreAPI from '../../utils/CoreAPI/index';

/**
 * Promise representing the job taking place
 */
type Job = Promise<boolean>;

type Jobs = Promise<boolean[]>;

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
  const thunks = createThunks(module);

  // Go through store and update local data
  // TODO: Optimize
  const [cleanRows, dirtyRows] = R.partition(R.propEq('status', 'clean'), moduleState.rows);

  // Aggregate requests to create local rows
  const remoteCreates = dirtyRows
    .filter(r => r.status === 'local')
    .map(async r => store.dispatch(thunks.createRow(r)))
  ;

  // Aggregate requests to update local rows
  const remoteUpdates = dirtyRows
    .filter(r => r.status === 'modified')
    .map(async r => store.dispatch(thunks.updateRow(r)))
  ;

  // Aggregate all local requests to remote
  const localToRemoteSync = Promise.all([
    ...remoteCreates,
    ...remoteUpdates,
  ]);

  // Get ALL the rows on the core
  // TODO: Change to conditional GET to only get updated/new farmers
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

// tslint:disable-next-line:no-var-keyword
var intervalId: number;

const activeModuleJobs = {} as CurrentModuleJobs;

const instance: SyncServiceInstance = Object.freeze({

  // A get property will call a function when accessed and return the value
  // Useful for abstracting away logic from the outside
  get syncing() {
    return !!Object.values(activeModuleJobs).length;
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
    const currentJob = activeModuleJobs[module];
    if (currentJob) {
      return currentJob;
    }

    const job = createJob(module);

    // Add job to active module jobs
    activeModuleJobs[module] = job;

    // When job finishes, remove from active module jobs
    job.then(() => {
      delete activeModuleJobs[module];
    });

    return job;
  },
});

// Setup interval to sync all modules
intervalId = setInterval(instance.syncAll, SYNC_FREQUENCY);

export default instance;
