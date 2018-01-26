import { ThunkAction } from 'redux-thunk';

import { Farmer, Action, PartialFarmer, BaseCreateFarmer, BaseUpdateFarmer } from './types';
import { State, CoreThunk, ModuleStatus } from '../../types';
import StoreUtils from '../../../utils/StoreUtils';
import { CorePath } from '../../../utils/CoreRequest/index';

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

  createFarmer: (farmer: BaseCreateFarmer): CoreThunk => async (dispatch, getState, { CoreAPI }) => {
    const { model, localUUID } = StoreUtils.createLocalStoreModel(farmer);

    // Store the local copy
    dispatch(createFarmer(model));
    dispatch(setFarmersDirty(true));

    // Send the new farmer to the core
    const request = new CoreAPI(CorePath.FARMERS);

    { let coreUUID: string, lastModified: string;

      try {
        ({ coreUUID, lastModified } = await request.create(farmer));
      } catch (response) {
        // TODO: Deal with error path
        return;
      }

      // Create updated model and update store
      const updatedModel = StoreUtils.updateLocalStoreModel(model, coreUUID, lastModified);
      dispatch(updateFarmerUUID(localUUID, updatedModel));
    }

    // Check if the module is dirty & update isDirty state
    const isDirty = getState().farmer.farmers.some(f => f.status !== 'clean');
    dispatch(setFarmersDirty(isDirty));
  },

  updateFarmer: (farmer: BaseUpdateFarmer): ThunkAction<Promise<void>, State, {}> => async (dispatch, getState) => {

  },
};

export default farmerThunks;

