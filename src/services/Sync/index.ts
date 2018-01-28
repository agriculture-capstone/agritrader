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

type CurrentlySyncing = (CoreModule | 'all')[];

function createSyncService(): SyncServiceInstance {

  // Use closure for private variables / methods
  const _p = {
    syncing: false,

    _currentlySyncing: [] as CurrentlySyncing,

    get currentlySyncing() {
      return _p._currentlySyncing;
    },

    set currently(value: CurrentlySyncing) {

    },

    async syncModule(module: CoreModule): Promise<void> {

    },
  };

  const instance: SyncServiceInstance = {

    // A get property will call a function when accessed and return the value
    // Useful for abstracting away logic from the outside
    get syncing() {
      return _p.syncing;
    },

    async syncAll() {
      // Set syncing to true
      _p.syncing = true;
      _p.currentlySyncing = ['all'];

      // Forcing the types to work because we know better than Typescript here (be careful)
      const modulesPending = Object.values(CoreModule).map(m => _p.syncModule(m as CoreModule));

      await Promise.all(modulesPending);

      _p.syncing = false;

      return;
    },

    async syncModule(module: CoreModule) {
      _p.syncing = true;

      await _p.syncModule(module);

      _p.syncing = false;
    },
  };

  return Object.freeze(instance);
}

function SyncService(): SyncServiceInstance {
  // Again have to force types because Typescript doesn't understand symbols
  if (!(SyncService as any)[INSTANCE_ACCESSOR]) {
    (SyncService as any)[INSTANCE_ACCESSOR] = createSyncService();
  }

  return (SyncService as any)[INSTANCE_ACCESSOR] as SyncServiceInstance;
}

export default SyncService;
