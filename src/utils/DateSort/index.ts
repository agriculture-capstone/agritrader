import * as moment from 'moment';

/**
 * Methods for sorting object arrays by datetime
 */
export const dateSort = {
  /**
  * sort object by data and place in ascending order 
  */
  sortAscending(array: any[]): any[] {
    return array.sort(function (a, b) {
      let d1 = moment(a.datetime, 'MMM DD[\n]h:mm a');
      let d2 =  moment(b.datetime, 'MMM DD[\n]h:mm a');
      return d1 > d2 ? 1 : d1 < d2 ? -1 : 0;
    });
  },
  /**
  * sort object by data and place in descending order
  */
  sortDescending(array: any[]): any[] {
    return array.sort(function (a, b) {
      let d1 = moment(a.datetime, 'MMM DD[\n]h:mm a');
      let d2 =  moment(b.datetime, 'MMM DD[\n]h:mm a');
      return d1 > d2 ? -1 : d1 < d2 ? 1 : 0;
    });
  },
};
