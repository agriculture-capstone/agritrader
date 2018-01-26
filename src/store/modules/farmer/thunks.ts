import { ThunkAction } from 'redux-thunk';

import { Farmer, Action, BaseCreateFarmer, BaseUpdateFarmer, PartialFarmer } from './types';
import { State, CoreThunk } from '../../types';
import StoreUtils from '../../../utils/StoreUtils';
import { CorePath } from '../../../utils/CoreAPI/index';

function updateFarmer(farmer: PartialFarmer): Action {
  return {
    farmer,
    type: 'UPDATE_FARMER',
  };
}

function createFarmer(farmer: Farmer): Action {
  return {
    farmer,
    type: 'CREATE_FARMER',
  };
}

function updateFarmerUUID(oldUUID: string, farmer: Farmer): Action {
  return {
    oldUUID,
    farmer,
    type: 'UPDATE_FARMER_UUID',
  };
}

function setFarmersDirty(isDirty: boolean): Action {
  return {
    isDirty,
    type: 'SET_FARMERS_DIRTY',
  };
}

const farmerThunks = {

  /** Create a new farmer */
  createFarmer: (farmer: BaseCreateFarmer): CoreThunk => async (dispatch, getState, { CoreAPI }) => {
    const { model, localUUID } = StoreUtils.createLocalStoreModel(farmer);

    // Store the local copy
    dispatch(createFarmer(model));
    dispatch(setFarmersDirty(true));

    // Send the new farmer to the core
    const request = new CoreAPI(CorePath.FARMERS);

    // Create new block for block scoped variables (let) to avoid errors
    { let coreUUID: string, lastModified: string;

      // Attempt to create resource on core
      try {
        ({ coreUUID, lastModified } = await request.create(farmer));
      } catch (err) {
        // Failed to create resource on Core
        if (isResponse(err)) {
          // TODO: Deal with different core errors
          const response = err;
          // tslint:disable-next-line:no-console
          console.log(response.status);
        } else {
          // Not a response error, should be logged
          // TODO: Log me
          // tslint:disable-next-line:no-console
          console.log(err.message || err);
        }
      }

      // Create updated model and update store
      const updatedModel = StoreUtils.updateModelCoreProperties(model, coreUUID, lastModified);
      dispatch(updateFarmerUUID(localUUID, updatedModel));
    }

    // Check if the module is dirty & update isDirty state
    const isDirty = getState().farmer.farmers.some(f => f.status !== 'clean');
    dispatch(setFarmersDirty(isDirty));
  },

  /** Update an existing farmer */
  updateFarmer: (farmerUpdate: BaseUpdateFarmer): CoreThunk => async (dispatch, getState, { CoreAPI }) => {
    const { uuid } = farmerUpdate;

    // Update the farmer in store
    dispatch(updateFarmer(farmerUpdate));

    // Retrieve the updated farmer
    const updatedFarmer = getState().farmer.farmers.find(f => f.uuid === uuid);

    // Deal with no farmer found
    if (farmerNotFound(updatedFarmer)) {
      // TODO: Deal with me
      return;
    }

    // Send update to the core
    const request = 
  },
};

function isResponse(response: any): response is Response {
  return (response instanceof Response);
}

function farmerNotFound(farmer?: Farmer): farmer is undefined {
  return (farmer === undefined);
}

export default farmerThunks;

