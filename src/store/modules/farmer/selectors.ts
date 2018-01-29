import { createSelector } from 'reselect';
import { State } from '../../types';
import { StoreFarmer } './types';

const getCurrentFarmerUUID = (state: State) => state.activeRows.activeFarmerUUID;

const getFarmers = (state: State) => state.farmer.rows;

const maybeGetActiveFarmer = createSelector(
  getCurrentFarmerUUID,
  getFarmers,
  (uuid, farmers) => farmers.find(f => f.uuid === uuid),
);

/**
 * Selector for getting the active farmer.
 */
export const getActiveFarmer = createSelector(
  maybeGetActiveFarmer,
  (maybeFarmer) => {
    // TODO: Re-evaluate this
    // if (!maybeFarmer) throw new Error('Active farmer should be a match for a farmer');
    if (!maybeFarmer) {
      const empty: StoreFarmer = { 
        firstName: '',
        middleName: '',
        lastName: '',
        phoneCountry: '',
        phoneArea: '',
        phoneNumber: '',
        notes: '',
        companyName: '',
        status: 'clean', 
        lastModified: '',
        uuid: '',
      };
      return empty;
    }
    return maybeFarmer;
  },
);

