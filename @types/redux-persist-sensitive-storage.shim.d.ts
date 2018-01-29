declare module 'redux-persist-sensitive-storage' {
  import { AsyncStorage } from 'redux-persist';

  export interface SensitiveStoreOptions {
    keychainService: string,
    sharedPreferencesName: string;
  }

  type createSensitiveStorage = (options: SensitiveStoreOptions) => AsyncStorage;

  const createSensitiveStorage: createSensitiveStorage;

  export default createSensitiveStorage;
}
