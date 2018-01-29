import { createSelector } from 'reselect';
import { State } from '../../types';

const getCurrentFarmerUUID = (state: State) => state.activeRows.activeFarmerUUID;

const getFarmers = (state: State) => state.farmer.rows;

const maybeGetActiveFarmer = createSelector(
  getCurrentFarmerUUID,
  getFarmers,
  (uuid, farmers) => farmers.find(f => f.uuid === uuid),
);

export const getActiveFarmer = createSelector(
  maybeGetActiveFarmer,
  (maybeFarmer) => {
    // TODO: Re-evaluate this
    if (!maybeFarmer) throw new Error('Active farmer should be a match for a farmer');

    return maybeFarmer;
  },
);

