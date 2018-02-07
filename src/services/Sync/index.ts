import Config from 'react-native-config';
import * as R from 'ramda';

import { CoreModuleName, getModulePath, createThunks, createSyncActions, CoreModuleNames } from '../../utils/CoreModule';
import store from '../../store';
import { CoreModuleState } from '../../store/types';
import CoreAPI from '../../utils/CoreAPI/index';


/**
 * Promise representing the job taking place
 */
type Job = Promise<boolean>;

type Jobs = Promise<boolean[]>;

interface CurrentModuleJobs {
  [key: string]: Job | undefined;
}

/** Instance of the sync service */
export interface SyncServiceInstance {

  /**
   * Whether the service is currently syncing or not
   */
  readonly syncing: boolean;

  /**
   * Start the sync service
   */
  start(): void;

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
  syncModule(module: CoreModuleName): Job;
}

/** Sync service module */
export interface SyncService {
  /** Get instance of sync service */
  (): SyncServiceInstance;

  /** Stop the sync service from running */
  stop(): Promise<void>;
}

/**
 * Keeps track of the current sync interval id
 */
let intervalId = -1;

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
const DEFAULT_FREQUENCY = 30;

/** Number of milliseconds in a second */
const TO_MILLISECONDS = 1000;

/** The sync frequency for automatic sync */
const SYNC_FREQUENCY = TO_MILLISECONDS * (Config.SYNC_FREQUENCY || DEFAULT_FREQUENCY);

/**
 * Keep track of the current module jobs
 *
 * Represents active modules that are currently syncing
 */
const activeModuleJobs = {} as CurrentModuleJobs;

/**
 * Type guard to determine if a module is an active job
 *
 * @param a Object to test
 */
function isJob<T>(a: Promise<T> | undefined): a is Promise<T> {
  return (typeof a !== 'undefined');
}

/**
 * Determine whether the sync service interval is active or not
 *
 * @param intervalId ID for sync service interval
 */
function isRunning(intervalId: number) {
  return !!~intervalId;
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
async function createJob(module: CoreModuleName): Job {
  const actions = createSyncActions(module);
  const { rows: localRows } = (store.getState() as any)[module] as CoreModuleState<{}>;
  const path = getModulePath(module);
  const api = new CoreAPI(path);
  const thunks = createThunks(module);

  return new Promise(async (resolve, reject) => {
    if (R.contains(module, ['milk']) && activeModuleJobs['farmer']) {
      await activeModuleJobs['farmer'];
    }

    // Go through store and update local data
    // TODO: Optimize
    const [cleanRows, dirtyRows] = R.partition(R.propEq('status', 'clean'), localRows);

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
      const existsClean = R.innerJoin(
        (remoteRow, localRow) => remoteRow.uuid === localRow.uuid,
        remoteRows,
        cleanRows,
      );

      // Get the rows that do not exist locally
      const notExists = R.differenceWith(
        (remoteRow, localRow) => remoteRow.uuid === localRow.uuid,
        remoteRows,
        localRows,
      );

      // Map to appropriate dispatches
      existsClean.map(r => store.dispatch(actions.syncUpdateRow(r)));
      notExists.map(r => store.dispatch(actions.syncCreateRow({ ...r })));
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
  }) as Job;
}

function createSyncService(): SyncServiceInstance {

  const instance: SyncServiceInstance = {

    /** Will start the sync service if it is not already running */
    start() {
      if (!isRunning(intervalId)) {
        intervalId = setInterval(instance.syncAll);
      }
    },

    // A get property will call a function when accessed and return the value
    // Useful for abstracting away logic from the outside
    get syncing() {
      return !!Object.values(activeModuleJobs).length;
    },

    /** Sync all modules */
    async syncAll(): Jobs {
      // Reset the time for next automatic sync
      if (isRunning(intervalId)) {
        clearInterval(intervalId);
        intervalId = setInterval(instance.syncAll, SYNC_FREQUENCY);
      }

      // Forcing the types to work because we know better than Typescript here (be careful)
      const modulesPending = CoreModuleNames.map(async m => instance.syncModule(m as CoreModuleName));

      return Promise.all(modulesPending);
    },

    /**
     * Sync a specific module
     *
     * @param module Module to sync
     */
    async syncModule(module: CoreModuleName) {
      // Check if there is currently an active job for this module, return if so
      const currentJob = activeModuleJobs[module];
      if (currentJob) {
        return currentJob;
      }

      // Deal with dependencies
      if (R.contains(module, ['milk'])) {
        await instance.syncModule('farmer');
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
  };

  // Return a frozen instance
  return Object.freeze(instance);
}

/**
 * Accessor for SyncService
 *
 * @returns Singleton instance of SyncService
 */
const SyncService: SyncService = function SyncService(): SyncServiceInstance {
  // Have to force types because Typescript doesn't understand symbols
  if (!(SyncService as any)[INSTANCE_ACCESSOR]) {
    (SyncService as any)[INSTANCE_ACCESSOR] = createSyncService();
  }

  return (SyncService as any)[INSTANCE_ACCESSOR] as SyncServiceInstance;
} as SyncService;

SyncService.stop = async function stop() {
  if (isRunning(intervalId)) clearInterval(intervalId);
  intervalId = -1;
  return Promise.all(Object.values(activeModuleJobs).filter(isJob)).then(v => void NaN);
};

export default SyncService;
