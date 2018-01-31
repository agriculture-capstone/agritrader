import { SyncServiceInstance } from '..';

const mockInstance: SyncServiceInstance = {
  syncAll: jest.fn(),

  syncModule: jest.fn(),

  syncing: true,
};

export default mockInstance;
