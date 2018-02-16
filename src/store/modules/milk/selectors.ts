import { createSelector } from 'reselect';
import { MilkEntry, StoreMilkEntry} from './types';
import { ExportEntry} from '../export/types';
import { State } from '../../types';

import * as moment from 'moment';

const getMilkEntries = (state: State) => state.milk.rows;
const getExportEntries = (state: State) => state.export.rows;
const getCurrentMilkEntryUUID = (state: State) => state.activeRows.activeMilkEntryUUID;
const getCurrentFarmerUUID = (state: State) => state.activeRows.activeFarmerUUID;

const decimals = 1;

const maybeGetActiveMilkEntry = createSelector(
  getCurrentMilkEntryUUID,
  getMilkEntries,
  (uuid, getMilkEntries) => getMilkEntries.find(e => e.uuid === uuid),
);

/**
 * Selector for getting the active milk entry
 */
export const getActiveMilkEntry = createSelector(
  maybeGetActiveMilkEntry,
  (maybeMilkEntry) => {
    // TODO: Re-evaluate this
    if (!maybeMilkEntry) {
      const empty: StoreMilkEntry = {
        type: 'milk',
        datetime: '',
        toPersonUuid: '',
        fromPersonUuid: '',
        amountOfProduct: 0,
        costPerUnit: 0,
        currency: '',
        milkQuality: '',
        status: 'clean',
        lastModified: '',
        uuid: '',
      };
      return empty;
    }
    return maybeMilkEntry;
  },
);

/************Selectors for all milk entries (used on Home page) ***************/
/**Selector to calculate the current days milk collection */
export const getDaysMilkTotal = createSelector(
  [getMilkEntries],
  (milkEntries: MilkEntry[]) => milkEntries.reduce((sum: number, entry: MilkEntry) =>
    inSameDay(entry.datetime) ? sum + entry.amountOfProduct : sum + 0, 0).toFixed(decimals));

/**Selector to calculate the average daily milk collection */
export const getAvgDaysMilkTotal = createSelector(
  [getMilkEntries],
  (milkEntries: MilkEntry[]) => {
    return calculateAverage(groupBy(milkEntries.map(entry =>
      ({ ...(entry as any), dateID: moment(entry.datetime, 'ddd MMM DD Y kk:mm:ss ZZ').utc().format() })), 'dateID'));
  },
);

/**Selector to calculate the Milk on hand (what hasn't been exported yet) */
export const getMilkInventory = createSelector(
  [getMilkEntries, getExportEntries],
  (milkEntries: MilkEntry[], exportEntries: ExportEntry[]) => {
      let milkSum = milkEntries.reduce((sum: number, entry: MilkEntry) =>sum + entry.amountOfProduct, 0)
      let exportSum = exportEntries.reduce((sum: number, entry: ExportEntry) =>sum + entry.amountOfProduct, 0)
      return milkSum - exportSum;
  },
);

/************Selectors for a specific farmer ***************/

/**Selector to get all milk transactions for a specific farmer  */
export const getFarmersTransactions = createSelector(
  [getMilkEntries, getCurrentFarmerUUID],
  (milkEntries: StoreMilkEntry[], farmerUUID: string) => milkEntries.filter(entry => !entry.fromPersonUuid.localeCompare(farmerUUID)));

/**
 * Selector to get all milk transactions for a specific farmer formatted for the collect page
 * if using with the DataTable ensure that the last element in the array is the milk transaction uuid.
 */
export const getFormattedFarmersTransactions = createSelector(
  [getFarmersTransactions],
  (milkEntries: StoreMilkEntry[]) => milkEntries.map(entry =>
    ({
      datetime: moment(entry.datetime, 'ddd MMM DD Y kk:mm:ss ZZ').format('MMM DD'),
      amountOfProduct: entry.amountOfProduct.toFixed(decimals),
      milkValue: Math.ceil((entry.costPerUnit * entry.amountOfProduct)).toFixed(0), 
      uuid: entry.uuid,
    }),
  ),
);

/**Selector for the weekly farmer account balance */
export const getFarmerWeeklyBalance = createSelector(
  [getFarmersTransactions],
  (milkEntries: MilkEntry[]) => numberFormatter(milkEntries.reduce((sum: number, entry: MilkEntry) =>
    (inLastWeek(entry.datetime)) ? sum + (entry.costPerUnit * entry.amountOfProduct) : sum + 0, 0)).toString());

/**Selector to calculate the current days milk collection */
export const getFarmerDayTotal = createSelector(
  [getFarmersTransactions],
  (milkEntries: MilkEntry[]) => numberFormatter(milkEntries.reduce((sum: number, entry: MilkEntry) =>
    inSameDay(entry.datetime) ? sum + entry.amountOfProduct : sum + 0, 0)).toString());

/**Selector to calculate the farmers total milk collected this week */
export const getWeeklyFarmerMilkTotal = createSelector(
  [getFarmersTransactions],
  (milkEntries: MilkEntry[]) => numberFormatter(milkEntries.reduce((sum: number, entry: MilkEntry) =>
    (inLastWeek(entry.datetime)) ? sum + entry.amountOfProduct : sum + 0, 0)).toString());

/**Selector to calculate the farmers total milk collected this month */
export const getMonthlyFarmerMilkTotal = createSelector(
  [getFarmersTransactions],
  (milkEntries: MilkEntry[]) => milkEntries.reduce((sum: number, entry: MilkEntry) =>
    (inSameMonth(entry.datetime)) ? sum + entry.amountOfProduct : sum + 0, 0).toFixed(decimals));


/************Helper Methods************/


function inSameDay(date: string) {
  return moment(date, 'ddd MMM DD Y kk:mm:ss ZZ').local().isSame(moment().local(), 'day') ? true : false;
}

function inLastWeek(date: string) {
  return moment(date, 'ddd MMM DD Y kk:mm:ss ZZ').local().isSame(moment().local(), 'week') ? true : false;
}

function inSameMonth(date: string) {
  return moment(date, 'ddd MMM DD Y kk:mm:ss ZZ').local().isSame(moment().local(), 'month') ? true : false;
}

let averages: number[] = [];
function calculateAverage(groupedEntries: any) {
  Object.keys(groupedEntries).forEach((element) => {
    averages.push(groupedEntries[element].reduce((sum: number, entry: MilkEntry) =>
      sum + entry.amountOfProduct, 0));
  });
  let averagesLength = (averages.length === 0) ? 1 : averages.length; // make sure we arn't dividing by 0
  return (averages.reduce((acc: number, entry: number) => acc + entry, 0) / averagesLength).toFixed(0);
}

/**
 * @example

var myList = [
  {time: '12:00', location: 'mall'    },
  {time: '9:00',  location: 'store'   },
  {time: '9:00',  location: 'mall'    },
  {time: '12:00', location: 'store'   },
  {time: '12:00', location: 'market'  },
];

var byLocation = myList.groupBy('location');

***RESULT**
  byLocation = {
    mall: [
      {time: '9:00',  location: 'mall'  },
      {time: '12:00', location: 'mall'  },
    ],
    store: [
      {time: '9:00',  location: 'store' },
      {time: '12:00', location: 'store' }
    ],
    market: [
      {time: '12:00', location: 'market'}
    ]
  }
 */
function groupBy<T>(array: T[], prop: string) {
  return array.reduce(function (groups: any, item: any) {
    let val = item[prop];
    groups[val] = groups[val] || [];
    groups[val].push(item);
    return groups;
  }, {});
}

function numberFormatter(num : number) {
  const thousand = 1000;
  const million = 1000000;
  const billion = 1000000000;
  if (num >= billion) {
    return (num / billion).toFixed(decimals).replace(/\.0$/, '') + 'B';
  }
  if (num >= million) {
    return (num / million).toFixed(decimals).replace(/\.0$/, '') + 'M';
  }
  if (num >= thousand) {
    return (num / thousand).toFixed(decimals).replace(/\.0$/, '') + 'K';
  }
  return num;
}
