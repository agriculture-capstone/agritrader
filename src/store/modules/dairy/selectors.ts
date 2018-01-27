import { createSelector } from 'reselect';
import { Dairy } from './types';
import { State } from '../../types';

import * as moment from 'moment';

const getDairyEntries = (state: State) => state.dairy.dairyList;
const getCurrentFarmerUUID = (state: State) => state.currentFarmer.currentFarmerUUID;


/************Selectors for all milk entries ***************/
/**Selector to calculate the current days milk collection */
export const getDaysDairyTotal = createSelector(
  [getDairyEntries],
  (dairyEntries: Dairy[]) => dairyEntries.reduce((sum: any, entry: any) => inSameDay(entry.datetime) ? sum + parseInt(entry.volume, 10) : sum + 0, 0));

/**Selector to calculate the average daily milk collection */
export const getAvgDaysDairyTotal = createSelector(
  [getDairyEntries],
  (dairyEntries: Dairy[]) => {
    return calculateAverage(groupBy(dairyEntries.map(entry => ({ ...(entry as any), dateID: moment(entry.datetime).utc().format() })), 'dateID'));
  },
);


//TODO return specific transaction based on uuid
//Return current farmer object
/************Selectors for a specific farmer ***************/

/**Selector to calculate the farmers total milk collected this week **Still struggling with this one** */
export const getFarmersTransactions = createSelector(
  [getDairyEntries, getCurrentFarmerUUID],
  (dairyEntries: Dairy[], farmerUUID: string) => dairyEntries.filter(entry => entry.fromUUID.localeCompare(farmerUUID)));

/**Selector to calculate the farmers total milk collected this week **Still struggling with this one** */
export const getFormattedFarmersTransactions = createSelector(
  [getFarmersTransactions],
  (dairyEntries: Dairy[]) => dairyEntries.map(entry => 
    ({ datetime:moment(entry.datetime).format('MMM, Do[\n]kk:mm'), volume:entry.volume, quality:entry.quality, costPerUnit:entry.costPerUnit }), 
  ),
);

/**Selector to calculate the farmers total milk collected this week */
export const getWeeklyFarmerDairyTotal = createSelector(
  [getFarmersTransactions],
  (dairyEntries: Dairy[]) => dairyEntries.reduce((sum: any, entry: any) => (inLastWeek(entry.datetime)) ? sum + parseInt(entry.volume, 10) : sum + 0, 0));

/**Selector to calculate the farmers total milk collected this month */
export const getMonthlyFarmerDairyTotal = createSelector(
  [getFarmersTransactions],
  (dairyEntries: Dairy[]) => dairyEntries.reduce((sum: any, entry: any) => (inSameMonth(entry.datetime)) ? sum + parseInt(entry.volume, 10) : sum + 0, 0));


/************Helper Methods************/


function inSameDay(date: string) {
  return moment(date).utc().isSame(moment().utc(), 'day') ? true : false;
}

function inLastWeek(date: string) {
  return moment(date).utc().isSame(moment().utc(), 'week') ? true : false;
}

function inSameMonth(date: string) {
  return moment(date).utc().isSame(moment().utc(), 'month') ? true : false;
}

let averages = [4, 5, 6, 7];

function calculateAverage(groupedEntries: any) {
  let keys: string[] = Object.keys(groupedEntries);
  keys.forEach((element) => {
    //this is the array of same dates
    console.log(averages.push(groupedEntries[element].reduce((sum: number, entry: Dairy) => sum + entry.volume, 0)));
  });
  return averages.reduce((acc: number, entry: number) => acc + entry, 0);

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

