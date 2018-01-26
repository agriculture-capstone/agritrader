import { ThunkAction } from 'redux-thunk';

import { Farmer, Action, PartialFarmer, BaseCreateFarmer, BaseUpdateFarmer } from './types';
import { State, CoreThunk } from '../../types';
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

const farmerThunks = {

  createFarmer: (farmer: BaseCreateFarmer): CoreThunk => async (dispatch, getState, { CoreAPI }) => {
    const { model, localUUID } = StoreUtils.createLocalStoreModel(farmer);

    // Store the local copy
    dispatch(createFarmer(model));

    // Send the new farmer to the core
    const request = new CoreAPI(CorePath.FARMERS);
    try {
      const { coreUUID, lastModified } = await request.create(farmer);
      const updatedModel = StoreUtils.updateLocalStoreModel(model, coreUUID, lastModified);
      dispatch(updateFarmer(updatedModel));
    } catch (response) {

    }
  },

  updateFarmer: (farmer: BaseUpdateFarmer): ThunkAction<Promise<void>, State, {}> => async (dispatch, getState) => {

  },
};

export default farmerThunks;

