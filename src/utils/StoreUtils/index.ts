import * as uuid4 from 'uuid/v4';

import { CoreData, Status } from '../../store/types';
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

  updateLocalStoreModel<T>(model: T, coreUUID: string, lastModified: string): CoreData<T> {
    const status: Status = 'clean';
    return Object.assign({}, model, {
      lastModified,
      status,
      uuid: coreUUID,
    });
  },
};

export default StoreUtils;
