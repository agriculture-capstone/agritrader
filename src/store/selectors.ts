import { createSelector } from 'reselect';

import { getFarmerDairyBalanceNoFormat as getFarmerDairyBalance } from './modules/milk/selectors';
import { getFarmerLoanBalance } from './modules/loan/selectors';
import { getFarmerPaymentBalance } from './modules/payment/selectors';

/**
 * Selector for the farmer total balance for the week
 * Includes payments, loans, and dairy transactions
 */
export const getFarmerTotalBalance = createSelector(
  [getFarmerPaymentBalance, getFarmerLoanBalance, getFarmerDairyBalance],
  (paymentBalance: string, loanBalance: string, dairyBalance: string) => 
  ((Number(dairyBalance) - Number(paymentBalance) - Number(loanBalance)).toString()),
);
