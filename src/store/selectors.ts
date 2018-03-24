import { createSelector } from 'reselect';

import { getFarmerWeeklyBalanceNoFormat as getFarmerDairyBalance } from './modules/milk/selectors';
import { getFarmerLoanBalance } from './modules/loan/selectors';
import { getFarmerPaymentBalance } from './modules/payment/selectors';

const radix = 10;

/**
 * Selector for the farmer total balance for the week
 * Includes payments, loans, and dairy transactions
 */
export const getFarmerTotalBalance = createSelector(
  [getFarmerPaymentBalance, getFarmerLoanBalance, getFarmerDairyBalance],
  (paymentBalance: string, loanBalance: string, dairyBalance: string) => 
  ((parseInt(dairyBalance, radix) - parseInt(paymentBalance, radix) - parseInt(loanBalance, radix)).toString()),
);
