import { createSelector } from 'reselect';
import { LoanEntry, StoreLoanEntry } from './types';
import { State } from '../../types';
import { getFarmerWeeklyBalanceNoFormat as getFarmerDairyBalance } from '../milk/selectors';

import * as moment from 'moment';

const getLoanEntries = (state: State) => state.loan.rows;
const getCurrentLoanEntryUUID = (state: State) => state.activeRows.activeLoanEntryUUID;
const getCurrentFarmerUUID = (state: State) => state.activeRows.activeFarmerUUID;

const decimals = 1;
const radix = 10;

const maybeGetActiveLoanEntry = createSelector(
  getCurrentLoanEntryUUID,
  getLoanEntries,
  (uuid, getLoanEntries) => getLoanEntries.find(e => e.uuid === uuid),
);

/**
 * Selector for getting the active loan entry
 */
export const getActiveLoanEntry = createSelector(
  maybeGetActiveLoanEntry,
  (maybeLoanEntry) => {
    // TODO: Re-evaluate this
    if (!maybeLoanEntry) {
      const empty: StoreLoanEntry = {
        type: 'loan',
        datetime: '',
        toPersonUuid: '',
        fromPersonUuid: '',
        amount: 0,
        currency: '',
        status: 'clean',
        lastModified: '',
        uuid: '',
      };
      return empty;
    }
    return maybeLoanEntry;
  },
);


/************Selectors for a specific farmer ***************/

/**Selector to get all loan transactions for a specific farmer  */
export const getFarmersTransactions = createSelector(
  [getLoanEntries, getCurrentFarmerUUID],
  (loanEntries: StoreLoanEntry[], farmerUUID: string) => loanEntries.filter(entry => !entry.fromPersonUuid.localeCompare(farmerUUID)));

/**
 * Selector to get all loan transactions for a specific farmer formatted for the loans page
 * if using with the DataTable ensure that the last element in the array is the loan transaction uuid.
 */
export const getFormattedFarmersTransactions = createSelector(
  [getFarmersTransactions],
  (loanEntries: StoreLoanEntry[]) => loanEntries.map(entry =>
    ({
      datetime: moment(entry.datetime, 'ddd MMM DD Y kk:mm:ss ZZ').format('MMM DD'),
      loanValue:  entry.amount.toFixed(decimals), 
      uuid: entry.uuid,
    }),
  ),
);

/**
 * Selector for the farmer loan account balance
 * Note: This returns loans only from a week before the current date
 */
export const getFarmerLoanBalance = createSelector(
  [getFarmersTransactions],
  (loanEntries: LoanEntry[]) => loanEntries.reduce((sum: number, entry: LoanEntry) =>
    (inLastWeek(entry.datetime)) ? sum +  entry.amount : sum + 0, 0).toString(),
  );

/**
 * Selector for the farmer total balance for the week
 * Includes loans and dairy transactions
 * TODO: Functionality for payments as well
 */
export const getFarmerTotalBalance = createSelector(
  [getFarmerLoanBalance, getFarmerDairyBalance],
  (loanBalance: string, dairyBalance: string) => 
  ((parseInt(dairyBalance, radix) - parseInt(loanBalance, radix)).toString()),
);

/************Helper Methods************/

function inLastWeek(date: string) {
  return moment(date, 'ddd MMM DD Y kk:mm:ss ZZ').local().isSame(moment().local(), 'week') ? true : false;
}
