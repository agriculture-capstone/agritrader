import * as uuid4 from 'uuid/v4';

import { CoreData, Status, PartialCoreData } from '../../store/types';
import UTCDate from '../UTCDate';

interface LocalStoreModel<T> {
  model: CoreData<T>;
  localUUID: string;
}

const StoreUtils = {

  createLocalStoreModel<T>(original: T): LocalStoreModel<T> {
    const status: Status = 'local';
    const localUUID = `${uuid4()}-local`;
    const model = Object.assign({}, original, {
      status,
      lastModified: UTCDate.getCurrentDate(),
      uuid: localUUID,
    });

    return {
      localUUID,
      model,
    };
  },

  updateModelCoreProperties<T>(model: T, coreUUID: string, lastModified: string): CoreData<T> {
    const status: Status = 'clean';
    return Object.assign({}, model, {
      lastModified,
      status,
      uuid: coreUUID,
    });
  },

  updateModel<T>(oldModel: CoreData<T>, updates: PartialCoreData<T>) {
    // Declare block scoped `let` values at start of block
    let uuid: string, lastModified: string, partialUpdates: Partial<T> = {};

    // Remove the UUID and lastModified
    ({ uuid, lastModified, ...partialUpdates } = (updates as any));

    // Apply partial updates to the model
    return Object.assign({}, oldModel, partialUpdates, {
      lastModified: UTCDate.getCurrentDate(),
    });
  },
};

export default StoreUtils;
