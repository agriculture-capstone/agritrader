import { createSelector } from 'reselect';
import { MilkEntry } from './types';
import { State } from '../../types';

import * as moment from 'moment';

const getMilkEntries = (state: State) => state.milk.rows;
const getCurrentFarmerUUID = (state: State) => state.currentFarmer.currentFarmerUUID;
const radix: number = 10;

/************Selectors for all milk entries (used on Home page) ***************/
/**Selector to calculate the current days milk collection */
export const getDaysMilkTotal = createSelector(
  [getMilkEntries],
  (milkEntries: MilkEntry[]) => milkEntries.reduce((sum: number, entry: MilkEntry) =>
    inSameDay(entry.datetime) ? sum + parseInt(entry.volume, radix) : sum + 0, 0).toFixed(0));

/**Selector to calculate the average daily milk collection */
export const getAvgDaysMilkTotal = createSelector(
  [getMilkEntries],
  (milkEntries: MilkEntry[]) => {
    return calculateAverage(groupBy(milkEntries.map(entry =>
      ({ ...(entry as any), dateID: moment(entry.datetime).utc().format() })), 'dateID'));
  },
);

/**Selector to return a specific milk transaction based on UUID */
/***Not sure how we are getting the transaction uuid**/
// export const getSpecificMilkTransaction = createSelector(
//   [getMilkEntries, getCurrentFarmerUUID],
//   (milkEntries: MilkEntry[], farmerUUID: string) => milkEntries.filter(entry => !entry.uuid.localeCompare(uuid)));

/************Selectors for a specific farmer ***************/

/**Selector to get all milk transactions for a specific farmer  */
export const getFarmersTransactions = createSelector(
  [getMilkEntries, getCurrentFarmerUUID],
  (milkEntries: MilkEntry[], farmerUUID: string) => milkEntries.filter(entry => !entry.fromPersonUuid.localeCompare(farmerUUID)));

/**Selector to get all milk transactions for a specific farmer formatted for the collect page */
export const getFormattedFarmersTransactions = createSelector(
  [getFarmersTransactions],
  (milkEntries: MilkEntry[]) => milkEntries.map(entry =>
    ({ datetime: moment(entry.datetime).format('MM-DD[\n]kk:mm'), volume: entry.volume, quality: entry.quality, costPerUnit: entry.costPerUnit }),
  ),
);

/**Selector to calculate the current days milk collection */
export const getFarmerDayTotal = createSelector(
  [getFarmersTransactions],
  (milkEntries: MilkEntry[]) => milkEntries.reduce((sum: number, entry: MilkEntry) =>
    inSameDay(entry.datetime) ? sum + parseInt(entry.volume, radix) : sum + 0, 0));

/**Selector to calculate the farmers total milk collected this week */
export const getWeeklyFarmerMilkTotal = createSelector(
  [getFarmersTransactions],
  (milkEntries: MilkEntry[]) => milkEntries.reduce((sum: number, entry: MilkEntry) =>
    (inLastWeek(entry.datetime)) ? sum + parseInt(entry.volume, radix) : sum + 0, 0));

/**Selector to calculate the farmers total milk collected this month */
export const getMonthlyFarmerMilkTotal = createSelector(
  [getFarmersTransactions],
  (milkEntries: MilkEntry[]) => milkEntries.reduce((sum: number, entry: MilkEntry) =>
    (inSameMonth(entry.datetime)) ? sum + parseInt(entry.volume, radix) : sum + 0, 0));


/************Helper Methods************/


function inSameDay(date: string) {
  return moment(date).local().isSame(moment().local(), 'day') ? true : false;
}

function inLastWeek(date: string) {
  return moment(date).local().isSame(moment().local(), 'week') ? true : false;
}

function inSameMonth(date: string) {
  return moment(date).local().isSame(moment().local(), 'month') ? true : false;
}

let averages: number[] = [];
function calculateAverage(groupedEntries: any) {
  Object.keys(groupedEntries).forEach((element) => {
    averages.push(groupedEntries[element].reduce((sum: number, entry: MilkEntry) =>
      sum + parseInt(entry.volume, radix), 0));
  });
  return (averages.reduce((acc: number, entry: number) => acc + entry, 0) / averages.length).toFixed(0);
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

