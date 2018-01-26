import { Farmer, Action } from './types';
import { CoreThunk, StoreLocalCreationRow, StoreLocalUpdateRow, ThunkCreationRow, ThunkUpdateRow, StoreRow } from '../../types';
import StoreUtils from '../../../utils/StoreUtils';
import { CorePath } from '../../../utils/CoreAPI/index';

const createFarmerLocal = (row: StoreLocalCreationRow<Farmer>): Action =>
  ({ row, type: 'CREATE_FARMER_LOCAL' });

const createFarmerRemote = (localUUID: string, coreUUID: string, lastModified: string): Action =>
  ({ localUUID, coreUUID, lastModified, type: 'CREATE_FARMER_REMOTE' });

const updateFarmerLocal = (row: StoreLocalUpdateRow<Farmer>): Action =>
  ({ row, type: 'UPDATE_FARMER_LOCAL' });

const updateFarmerRemote = (uuid: string, lastModified: string): Action =>
  ({ uuid, lastModified, type: 'UPDATE_FARMER_REMOTE' });

const farmerThunks = {

  /** Create a new farmer */
  createFarmer: (newRow: ThunkCreationRow<Farmer>): CoreThunk => async (dispatch, getState, { CoreAPI }) => {
    const storeCreationRow = StoreUtils.convertCreationRow(newRow);
    const { uuid: localUUID } = storeCreationRow;

    // Store the local copy
    dispatch(createFarmerLocal(storeCreationRow));

    // Send the new farmer to the core
    const api = new CoreAPI(CorePath.FARMERS);
    const requestRow = StoreUtils.convertToCreateRequest(storeCreationRow);

    // Create new block for block scoped variables (let) to avoid errors
    { let coreUUID: string, lastModified: string;

      // Attempt to create resource on core
      try {
        ({ lastModified, uuid: coreUUID } = await api.create(requestRow));
      } catch (err) {
        // Failed to create resource on Core
        if (isResponse(err)) {
          // TODO: Deal with different core errors
          const response = err;
          // tslint:disable-next-line:no-console
          console.log(response.status);
          return;
        } else {
          // Not a response error, should be logged
          // TODO: Log me
          // tslint:disable-next-line:no-console
          console.log(err.message || err);
          return;
        }
      }

      // Create updated model and update store
      dispatch(createFarmerRemote(localUUID, coreUUID, lastModified));
    }
  },

  /** Update an existing farmer */
  updateFarmer: (rowUpdate: ThunkUpdateRow<Farmer>): CoreThunk => async (dispatch, getState, { CoreAPI }) => {
    const { uuid } = rowUpdate;
    const convertedRow = StoreUtils.convertUpdateRow(rowUpdate);

    // Update the farmer in store
    dispatch(updateFarmerLocal(convertedRow));

    // Retrieve the updated farmer
    const updatedRow = getState().farmer.rows.find(f => f.uuid === uuid);

    // Deal with no farmer found
    if (rowNotFound(updatedRow)) {
      // TODO: Deal with me
      return;
    }

    // Send update to the core
    const api = new CoreAPI(CorePath.FARMERS);
    const requestRow = StoreUtils.convertToUpdateRequest(updatedRow);

    { let lastModified: string;

      try {
        ({ lastModified } = await api.update(requestRow));
      } catch (err) {
        // Failed to create resource on Core
        if (isResponse(err)) {
          // TODO: Deal with different core errors
          const response = err;
          // tslint:disable-next-line:no-console
          console.log(response.status);
          return;
        } else {
          // Not a response error, should be logged
          // TODO: Log me
          // tslint:disable-next-line:no-console
          console.log(err.message || err);
          return;
        }
      }

      // Create updated model and update store
      dispatch(updateFarmerRemote(uuid, lastModified));
    }
  },
};

function isResponse(response: any): response is Response {
  return (response instanceof Response);
}

function rowNotFound<T>(row?: StoreRow<T>): row is undefined {
  return (row === undefined);
}

export default farmerThunks;
