import { Reducer } from 'redux';

import { FarmerState, Action } from './types';
import initialState from './state';
import { Status, StoreRow } from '../../types';

const rowReducer: Reducer<FarmerState> = (state = initialState, action: Action) => {
  let status: Status, isDirty: boolean;

  switch (action.type) {

    case 'CREATE_FARMER_LOCAL': {
      status = 'local';
      isDirty = true;
      const rows = { ...action.row, status };
      const farmers = [...state.rows, rows];

      return { ...state, farmers, isDirty };
    }

    case 'CREATE_FARMER_REMOTE': {
      status = 'clean';
      const { coreUUID: uuid, lastModified } = action;
      const rows = state.rows.map(r => r.uuid === action.localUUID ? { ...r, uuid, lastModified } : r);
      isDirty = deriveIsDirty(rows);

      return { ...state, rows, isDirty };
    }

    case 'UPDATE_FARMER_LOCAL': {
      status = 'modified';
      isDirty = true;
      const { row: tempRow, row: { uuid } } = action;
      const row = { ...tempRow, status };
      const rows = state.rows.map(r => r.uuid === uuid ? { ...r, ...row } : r);

      return { ...state, rows, isDirty };
    }

    case 'UPDATE_FARMER_REMOTE': {
      status = 'clean';
      const { uuid, lastModified } = action;
      const rows = state.rows.map(r => r.uuid === uuid ? { ...r, uuid, lastModified, status } : r);
      isDirty = deriveIsDirty(rows);

      return { ...state, rows };
    }

    default:
      return state;
  }
};

function deriveIsDirty<T>(rows: StoreRow<T>[]) {
  return rows.some(r => r.status !== 'clean');
}

export default rowReducer;

