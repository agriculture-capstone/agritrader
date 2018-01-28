import { CoreModule } from '../../utils/CoreModule/index';

/*
* A symbol is a primitive type that is guaranteed to be unique. That means
* the only thing that will match this symbol is this exact symbol right here.
* The only way to access the instance of SyncServiceInstance is using this symbol
* defined here.
*
* This is useful to mock out the SyncService during tests
*/
const INSTANCE_ACCESSOR = Symbol('Accessor for instance of SyncService');

/**
 * Promise representing the job taking place
 */
type Job = Promise<void>;

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
  syncAll(): Job;

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
async function createJob(module: string): Job {

}

function createSyncService(): SyncServiceInstance {

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

    async syncAll() {

      // Forcing the types to work because we know better than Typescript here (be careful)
      const modulesPending = Object.values(CoreModule).map(m => instance.syncModule(m as CoreModule));

      return Promise.all(modulesPending).then(() => {});
    },

    async syncModule(module: CoreModule) {
      // Check if there is currently an active job for this module
      if (_p.activeModuleJobs[module]) {
        return _p.activeModuleJobs[module];
      }

      const job = createJob(module);

      // Add job to active module jobs
      _p.activeModuleJobs[module] = job;

      // When job finishes, remove from active module jobs
      job.then(() => {
        _p.activeModuleJobs[module] = undefined;
      });

      return job;
    },
  };

  return instance;
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
