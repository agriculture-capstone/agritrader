import * as uuid4 from 'uuid/v4';

import {
  ThunkCreationRow,
  StoreLocalCreationRow,
  ThunkUpdateRow,
  StoreLocalUpdateRow,
  StoreRow,
  CoreCreationRequest,
  CoreUpdateRequest,
} from '../../store/types';
import UTCDate from '../UTCDate';

const StoreUtils = {

  convertCreationRow<T>(creationRow: ThunkCreationRow<T>): StoreLocalCreationRow<T> {
    const uuid = `${uuid4()}-local`;
    const lastModified = UTCDate.getCurrentDate();
    const row = Object.assign({}, creationRow, {
      uuid,
      lastModified,
    });

    return row;
  },

  convertUpdateRow<T>(rowUpdate: ThunkUpdateRow<T>): StoreLocalUpdateRow<T> {
    const lastModified = UTCDate.getCurrentDate();
    const row = Object.assign({}, rowUpdate, {
      lastModified,
    });

    return row;
  },

  convertToUpdateRequest<T>(storeRow: StoreRow<T>): CoreUpdateRequest<T> {
    let row: any, status: any;

    ({ status, ...row } = (storeRow));

    // Hack because typescript doesn't support generic spread
    return row as CoreUpdateRequest<T>;
  },

  convertToCreateRequest<T>(creationRow: StoreLocalCreationRow<T>): CoreCreationRequest<T> {
    let row: any, uuid: string;

    ({ uuid, ...row } = creationRow);

    // Hack because typescript doesn't support generic spread
    return row as CoreCreationRequest<T>;
  },
};

export default StoreUtils;
