import { createSelector } from 'reselect';
import { Farmer } from './types';
import { State } from '../../types';

const getFarmerEntries = (state: State) => state.farmer.rows;
const getCurrentFarmerUUID = (state: State) => state.currentFarmer.currentFarmerUUID;

/************Selectors for a specific farmer ***************/

/**Selector for a subset of fields for all farmers (not sure if we need this but if a page takes an array we might) */
export const getFormattedFarmers = createSelector(
  [getFarmerEntries],
  (farmEntries: Farmer[]) => farmEntries.map(entry => 
    ({ name: (entry.firstName + ' ' + entry.lastName), phoneNumber:('(' + entry.phoneArea + ') ' + entry.phoneNumber), uuid:entry.uuid }), 
  ),
);

/**Selector to obtain a specific farmers info */
export const getSpecificFarmer = createSelector(
  [getFarmerEntries, getCurrentFarmerUUID],
  (farmerEntries: Farmer[], farmerUUID: string) => farmerEntries.filter(entry => !entry.uuid.localeCompare(farmerUUID)));
