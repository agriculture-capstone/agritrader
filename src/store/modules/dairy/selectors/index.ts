import { createSelector } from 'reselect';
import UTCDate from '../../../../UTCDate'

const getDairyEntries = state => state.dairy.dairyList;
let getDate = entry => entry.datetime.dateString.split(' ').slice(0, 4).join(' ');

/**Selector to calculate the current days milk collection */
export const getDaysDairyTotal = createSelector(
  [getDairyEntries],
  dairyentries =>
    dairyentries.reducer((acc, entry) =>
      acc + (getDate(entry.datetime) === getDate(getCurrentDate())) ? entry.volume : 0));

/**Selector to calculate the average daily milk collection **Still struggling with this one** */
export const getAvgDaysDairyTotal = createSelector(
  [getDairyEntries],
  (dairyentries) => {
    const dayVolumeSums = dairyentries.map((entry) => {
      let days = [];
      if (getDate(entry.datetime) in days) {
        days.find(x => x.id === getDate(entry.datetime)).value += entry.volume;//increment days array item with volume
      } else {
        days.push({ id: getDate(entry.datetime), value: entry.volume });
      }
      return days;
    });
    return dayVolumeSums.reducer((acc, day) => acc + day.volume);
  },
);

/**Selector to calculate the farmers total milk collected this week **Still struggling with this one** */
export const getWeeklyFarmerDairyTotal = createSelector(
  [getDairyEntries],
  (dairyentries) => {
    let weekSum: number = 0;
    let weekDay: number = getCurrentDate().getDay;
    dairyentries.forEach(entry => {
      for (let i = 0; i <= weekDay; i++) {
        if (convertToDate(entry.datetime) === getCurrentDate().setDate(today.getDate() - i)) {
          weekSum += entry.volume;
        } else {
          continue;
        }
      }
    });
  },
);

/**Selector to calculate the farmers total milk collected this month */
export const getMonthlyFarmerDairyTotal = createSelector(
  [getDairyEntries],
  dairyentries =>
    dairyentries.reducer((acc, entry) =>
      acc + ((convertToDate(entry.dateTime).getMonth() === getCurrentDate().getMonth)
        && (convertToDate(entry.dateTime).getYear() === getCurrentDate().getYear)) ? entry.volume : 0));

