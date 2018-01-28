declare module 'redux-persist/lib/storage' {
  import { AsyncStorage } from 'redux-persist';

  const storage: AsyncStorage;

  export default storage;
}

declare module 'redux-persist/lib/integration/react' {
  import { PersistGate as PG } from 'redux-persist/es/integration/react';

  export const PersistGate: typeof PG;
}
