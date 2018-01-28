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
  syncAll(): Promise<void>;

  /**
   * Sync the specified module with the core
   *
   * @returns A promise that resolves when module has successfully synced
   */
  syncModule(module: CoreModule): Promise<void>;
}

interface CurrentlySyncing {
  [key: string]: Promise<void> | undefined;
}

/**
 * Syncs the specified module, without any concern to whether it is already syncing or not
 *
 * Should only be used by instance if the module is not currently syncing
 *
 * @param module Module to sync
 */
async function syncModule(module: string): Promise<void> {

}

function createSyncService(): SyncServiceInstance {

  // Use closure for private variables / methods
  const _p = {
    currentlySyncing: {} as CurrentlySyncing,
  };

  const instance: SyncServiceInstance = {

    // A get property will call a function when accessed and return the value
    // Useful for abstracting away logic from the outside
    get syncing() {
      return !!Object.values(_p.currentlySyncing).length;
    },

    async syncAll() {

      // Forcing the types to work because we know better than Typescript here (be careful)
      const modulesPending = Object.values(CoreModule).map(m => instance.syncModule(m as CoreModule));

      return Promise.all(modulesPending).then(() => {});
    },

    async syncModule(module: CoreModule) {
      if (_p.currentlySyncing[module]) {
        return _p.currentlySyncing[module];
      }

      const promise = syncModule(module);

      // Add promise to currentlySyncing
      _p.currentlySyncing[module] = promise;

      // When promise resolves, remove from currentlySyncing
      promise.then(() => {
        _p.currentlySyncing[module] = undefined;
      });

      return promise;
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
