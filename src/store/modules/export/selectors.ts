import { createSelector } from 'reselect';
import { ExportEntry, StoreExportEntry } from './types';
import { State } from '../../types';

import * as moment from 'moment';

const getExportEntries = (state: State) => state.export.rows;
const getCurrentExportEntryUUID = (state: State) => state.activeRows.activeExportEntryUUID;

const decimals = 1;

const maybeGetActiveExportEntry = createSelector(
  getCurrentExportEntryUUID,
  getExportEntries,
  (uuid, getExportEntries) => getExportEntries.find(e => e.uuid === uuid),
);

/**
 * Selector for getting the active export entry
 */
export const getActiveExportEntry = createSelector(
  maybeGetActiveExportEntry,
  (maybeExportEntry) => {
    // TODO: Re-evaluate this
    if (!maybeExportEntry) {
      const empty: StoreExportEntry = {
        type: 'export',
        datetime: '',
        transportId: '',
        fromPersonUuid: '',
        amountOfProduct: 0,
        status: 'clean',
        lastModified: '',
        uuid: '',
      };
      return empty;
    }
    return maybeExportEntry;
  },
);

/**Selector to calculate the current days exports */
export const getTodaysExportTotal = createSelector(
  [getExportEntries],
  (exportEntries: ExportEntry[]) => exportEntries.reduce((sum: number, entry: ExportEntry) =>
    inSameDay(entry.datetime) ? sum + entry.amountOfProduct : sum + 0, 0).toFixed(decimals));

/**
 * Selector to get all export transactions formatted for the export page
 * if using with the DataTable ensure that the last element in the array is the export transaction uuid.
 */
export const getFormattedExportTransactions = createSelector(
  [getExportEntries],
  (exportEntries: StoreExportEntry[]) => exportEntries.map(entry =>
    ({
      datetime: moment(entry.datetime, 'ddd MMM DD Y kk:mm:ss ZZ').format('MMM DD'),
      licencePlate: entry.transportId,
      amountOfProduct: entry.amountOfProduct, 
      uuid: entry.uuid,
    }),
  ),
);

/************Helper Methods************/

function inSameDay(date: string) {
  return moment(date, 'ddd MMM DD Y kk:mm:ss ZZ').local().isSame(moment().local(), 'day') ? true : false;
}

