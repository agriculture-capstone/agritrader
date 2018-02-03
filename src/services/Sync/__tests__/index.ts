// import { StoreRow, CoreRow } from '../../../store/types';
import CoreAPI from '../../../utils/CoreAPI';

jest.mock('../../../utils/CoreAPI');

// enum LocalRow {
//   UP_TO_DATE = 'bd7e101d-a02c-4e82-a7d4-458b7d80329d',
//   UPDATED_REMOTELY = 'eecf4a89-5cf2-4fa2-b481-5fc655bc0a7c',
//   UPDATED_LOCALLY = 'efaae893-5d21-4fe8-8a29-b7bcd5c37b82',
//   CREATED_LOCALLY = 'af006753-6220-4c36-a326-42e570f62fb8-local',
//   UPDATED_BOTH = 'd6a22a7b-59d5-4e07-950c-ae95ec75e2fb',
// }

// interface LocalRows {
//   upToDate: StoreRow<{}>;
//   updatedRemotely: StoreRow<{}>;
//   updatedLocally: StoreRow<{}>;
//   createdLocally: StoreRow<{}>;
// }

// enum RemoteRow {
//   UPDATED_REMOTELY = 'a93abfa8-bd0c-4eb6-ab33-a8a764a15c45',
//   UP_TO_DATE = '4baa5bbe-5b96-4c6c-a3db-301dbbb45522',
//   UPDATED_LOCALLY = '9e6dfbdc-ee9e-41fb-8499-edbb7471aab3',
//   CREATED_REMOTELY = '5dcafb0d-bdfe-4b95-8e21-76ec1b436570',
//   UPDATED_BOTH = 'd6a22a7b-59d5-4e07-950c-ae95ec75e2fb',
// }

// interface RemoteRows {
//   updatedRemotely: CoreRow<{}>;
//   upToDate: CoreRow<{}>;
//   updatedLocally: CoreRow<{}>;
//   createdRemotely: CoreRow<{}>;
// }

// const createLocalRows = (): LocalRows  => ({
//   upToDate: {
//     uuid: LocalRow.UP_TO_DATE,
//     lastModified: '',
//     status: 'clean',
//   },

//   updatedRemotely: {
//     uuid: LocalRow.UPDATED_REMOTELY,
//     lastModified: '',
//     status: 'clean',
//   },

//   updatedLocally: {
//     uuid: LocalRow.UPDATED_LOCALLY,
//     lastModified: '',
//     status: 'modified',
//   },

//   createdLocally: {
//     uuid: LocalRow.CREATED_LOCALLY,
//     lastModified: '',
//     status: 'local',
//   },
// });

// const createRemoteRows = (): RemoteRows => ({

//   updatedRemotely: {
//     uuid: RemoteRow.UPDATED_REMOTELY,
//     lastModified: '',
//   },

//   upToDate: {
//     uuid: RemoteRow.UP_TO_DATE,
//     lastModified: '',
//   },

//   updatedLocally: {
//     uuid: RemoteRow.UPDATED_LOCALLY,
//     lastModified: '',
//   },

//   createdRemotely: {
//     uuid: RemoteRow.CREATED_REMOTELY,
//     lastModified: '',
//   },
// });

describe('Sync Service', () => {

  beforeEach(() => {
    (CoreAPI as any).refresh();
  });

  describe('local data', () => {

    beforeEach(() => {

    });

    it('should create local rows', () => {

    });

    it('should update local rows', () => {

    });

    it('should not send up-to-date rows', () => {

    });
  });

  describe('remote data', () => {

    beforeEach(() => {

    });

    it('should create remote rows', () => {

    });

    it('should update remote rows', () => {

    });

  });

});
