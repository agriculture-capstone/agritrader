import { createSelector } from 'reselect';
import { Farmer } from './types';
import { State } from '../../types';

const getFarmerEntries = (state: State) => state.farmer.rows;
const getCurrentFarmerUUID = (state: State) => state.currentFarmer.currentFarmerUUID;

/************Selectors for a specific farmer ***************/

/**Selector to obtain a specific farmers info */
export const getSpecificFarmer = createSelector(
  [getFarmerEntries, getCurrentFarmerUUID],
  (farmerEntries: Farmer[], farmerUUID: string) => farmerEntries.filter(entry => !entry.uuid.localeCompare(farmerUUID)));
