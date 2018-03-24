import { createSelector } from 'reselect';
import { PaymentEntry, StorePaymentEntry } from './types';
import { State } from '../../types';
import { getFarmerDairyBalanceNoFormat as getFarmerDairyBalance } from '../milk/selectors';
import { getFarmerLoanBalance } from '../loan/selectors';

import * as moment from 'moment';

const getPaymentEntries = (state: State) => state.payment.rows;
const getCurrentPaymentEntryUUID = (state: State) => state.activeRows.activePaymentEntryUUID;
const getCurrentFarmerUUID = (state: State) => state.activeRows.activeFarmerUUID;

const decimals = 1;
const radix = 10;

const maybeGetActivePaymentEntry = createSelector(
  getCurrentPaymentEntryUUID,
  getPaymentEntries,
  (uuid, getPaymentEntries) => getPaymentEntries.find(e => e.uuid === uuid),
);

/** Selector for getting the active payment entry */
export const getActivePaymentEntry = createSelector(
  maybeGetActivePaymentEntry,
  (maybePaymentEntry) => {
    if (!maybePaymentEntry) {
      const empty: StorePaymentEntry = {
        type: 'payment',
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
    return maybePaymentEntry;
  },
);

/****************Selectors for a specific farmer ***************/

/** Selector to get all payment transactions for a specific farmer */
export const getFarmersTransactions = createSelector(
  [getPaymentEntries, getCurrentFarmerUUID],
  (paymentEntries: StorePaymentEntry[], farmerUUID: string) => paymentEntries.filter(entry => !entry.toPersonUuid.localeCompare(farmerUUID)),
);

/** 
 * Selector to get all payment transactions for a specific farmer formatted for the payments page
 * Ensure that the last element in the array is uuid if using with DataTable
 */
export const getFormattedFarmersTransactions = createSelector(
  [getFarmersTransactions],
  (paymentEntries: StorePaymentEntry[]) => paymentEntries.map(entry =>
    ({
      datetime: moment(entry.datetime).utc().format('MMM DD'),
      paymentValue: entry.amount.toFixed(decimals),
      uuid: entry.uuid,
    }),
  ),
);

/** 
 * Selector for the farmer account balance 
 * Note: This returns payments only from a week before the current date
 */
export const getFarmerPaymentBalance = createSelector(
  [getFarmersTransactions],
  (paymentEntries: PaymentEntry[]) => paymentEntries.reduce((sum: number, entry: PaymentEntry) =>
  sum + entry.amount, 0).toString(),
);

/**
 * Selector for the farmer total balance for the week
 * Includes payments, loans, and dairy transactions
 */
export const getFarmerTotalBalance = createSelector(
  [getFarmerPaymentBalance, getFarmerLoanBalance, getFarmerDairyBalance],
  (paymentBalance: string, loanBalance: string, dairyBalance: string) => 
  ((parseInt(dairyBalance, radix) - parseInt(paymentBalance, radix) - parseInt(loanBalance, radix)).toString()),
);

// /*************** Helper Methods ***************/
// function inLastWeek(date: string) {
//   return moment(date).utc().isSame(moment().local(), 'week') ? true : false;
// }
