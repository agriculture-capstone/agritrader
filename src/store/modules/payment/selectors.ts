import { createSelector } from 'reselect';
import { PaymentEntry, StorePaymentEntry } from './types';
import { State } from '../../types';

import * as moment from 'moment';

const getPaymentEntries = (state: State) => state.payment.rows;
const getCurrentPaymentEntryUUID = (state: State) => state.activeRows.activePaymentEntryUUID;
const getCurrentFarmerUUID = (state: State) => state.activeRows.activeFarmerUUID;

const decimals = 1;

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

/**************** Selectors for all farmers *********************/

/** Selector to get all payment transactions for all farmers */
export const getAllFarmersPaymentTransactions = createSelector(
  [getPaymentEntries],
  (paymentEntries: StorePaymentEntry[]) => paymentEntries);

/** Selector to get all payment transactions for all farmers with specifc formatting for TransactionLog Page */
export const getAllFormattedFarmersPaymentsTransactions = createSelector(
  [getAllFarmersPaymentTransactions],
  (paymentEntries: StorePaymentEntry[]) => paymentEntries.map(entry =>
    ({
      datetime: moment(entry.datetime).utc().format('MMM DD'),
      type: entry.type,
      paymentValue: entry.amount.toFixed(decimals),
      uuid: entry.uuid,
    }),
  ),
);

/**************** Selectors for a specific farmer ***************/

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
      type: entry.type,
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
