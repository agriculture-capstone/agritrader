import { Reducer } from 'redux';

import { FarmerState, Action, Farmer } from './types';
import initialState from './state';
import { Status } from '../../types';

const farmerReducer: Reducer<FarmerState> = (state = initialState, action: Action) => {
  let status: Status, isDirty: boolean;

  switch (action.type) {

    case 'CREATE_FARMER_LOCAL': {
      status = 'local';
      isDirty = true;
      const farmer = { ...action.row, status };
      const farmers = [...state.farmers, farmer];

      return { ...state, farmers, isDirty };
    }

    case 'CREATE_FARMER_REMOTE': {
      status = 'clean';
      const { coreUUID: uuid, lastModified } = action;
      const farmers = state.farmers.map(f => f.uuid === action.localUUID ? { ...f, uuid, lastModified } : f);
      isDirty = deriveIsDirty(farmers);

      return { ...state, farmers, isDirty };
    }

    case 'UPDATE_FARMER_LOCAL': {
      status = 'modified';
      isDirty = true;
      const { row: tempFarmer, row: { uuid } } = action;
      const farmer = { ...tempFarmer, status };
      const farmers = state.farmers.map(f => f.uuid === uuid ? { ...f, ...farmer } : f);

      return { ...state, farmers, isDirty };
    }

    case 'UPDATE_FARMER_REMOTE': {
      status = 'clean';
      const { uuid, lastModified } = action;
      const farmers = state.farmers.map(f => f.uuid === uuid ? { ...f, uuid, lastModified, status } : f);
      isDirty = deriveIsDirty(farmers);

      return { ...state, farmers };
    }

    default:
      return state;
  }
};

function deriveIsDirty(farmers: Farmer[]) {
  return farmers.some(f => f.status !== 'clean');
}

export default farmerReducer;

