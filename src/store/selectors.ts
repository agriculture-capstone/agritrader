import { createSelector } from 'reselect';

import { getFarmerDairyBalanceNoFormat as getFarmerDairyBalance } from './modules/milk/selectors';
import { getFarmerLoanBalance } from './modules/loan/selectors';
import { getFarmerPaymentBalance } from './modules/payment/selectors';

const decimals = 1;

/**
 * Selector for the farmer total balance for the week
 * Includes payments, loans, and dairy transactions
 */
export const getFarmerTotalBalance = createSelector(
  [getFarmerPaymentBalance, getFarmerLoanBalance, getFarmerDairyBalance],
  (paymentBalance: string, loanBalance: string, dairyBalance: string) => 
  numberFormatter((Number(dairyBalance) - Number(paymentBalance) - Number(loanBalance))).toString(),
);

/**
 * Function to format large numbers to be more readable
 * 
 * @param num Number that will be formatted
 */
function numberFormatter(num: number) {
  const thousand = 1000;
  const million = 1000000;
  const billion = 1000000000;
  if (Math.abs(num) >= billion) {
    return (num / billion).toFixed(decimals).replace(/\.0$/, '') + 'B';
  }
  if (Math.abs(num) >= million) {
    return (num / million).toFixed(decimals).replace(/\.0$/, '') + 'M';
  }
  if (Math.abs(num) >= thousand) {
    return (num / thousand).toFixed(decimals).replace(/\.0$/, '') + 'K';
  }
  return num;
}
