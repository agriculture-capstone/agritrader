import { createSelector } from 'reselect';
import UTCDate from '../../../../UTCDate'

const getDairyEntries = state => state.dairy.dairyList;
let getDate = entry => entry.datetime.dateString.split(' ').slice(0, 4).join(' ');

export const getDaysDairyTotal = createSelector(
  [getDairyEntries],
  dairyentries =>
    dairyentries.reducer((acc, entry) =>
      acc + (getDate(entry) === getDate(getCurrentDate())) ? entry.volume : 0));

export const getAvgDaysDairyTotal = createSelector(
  [getDairyEntries],
  (dairyentries) => {
    const dayVolumeSums = dairyentries.map((entry) => {
      let days = [];
      if (getDate(entry) in days) {
        days[days.indexOf(getDate(entry)) += entry.volume];
      } else {
        days.push({ getDate(entry): entry.volume });
      }
      return days;
    });
    let sum = 0;
    // go through  dayVolumeSums array and sum all the values
  },
);


export const getWeeklyFarmerDairyTotal = createSelector(
  [getDairyEntries],
  dairyentries =>
    dairyentries.reducer((acc, entry) =>
      acc + (getDate(entry) === getDate(getCurrentDate())) ? entry.volume : 0));

export const getMonthlyFarmerDairyTotal = createSelector(
  [getDairyEntries],
  dairyentries =>
    dairyentries.reducer((acc, entry) =>
      acc + ((convertToDate(entry.dateTime).getMonth() === getCurrentDate().getMonth) 
      && (convertToDate(entry.dateTime).getYear() === getCurrentDate().getYear)) ? entry.volume : 0));

