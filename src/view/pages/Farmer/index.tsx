import * as React from 'react';
import createTabManager from '../../hoc/TabManager';
import Collect from './tabs/Collect';
import Loan from './tabs/Loan';
//import Buy from './tabs/Buy';
import Info from './tabs/Info';

const createCollect = () => (
  <Collect />
);

const createLoan = () => (
  <Loan />
);

const demoPurchaseTransactions = [
  { date:'Jan 19', product: 'Cow Feed', quantity: '2', price: '6.50' },
  { date:'Jan 18', product: 'Soap', quantity: '2', price: '6.00' },
  { date:'Jan 17', product: 'Cow Feed', quantity: '2', price: '6.50' },
  { date:'Jan 16', product: 'Soap', quantity: '2', price: '6.00' },
  { date:'Jan 15', product: 'Soap', quantity: '1', price: '3.00' },
];

// const createBuy = () => (
//   <Buy
//     farmerName="Bradley the Farmer"
//     currentDayTotal="1001.01"
//     currentWeekTotal="50"
//     currentMonthTotal="405.50"
//     purchaseTransactions={demoPurchaseTransactions}
//   />
// );

const createInfo = () => (
  <Info />
);

export default createTabManager(
  [
    {
      name: 'Collect',
      element: createCollect,
    },
    {
      name: 'Loan',
      element: createLoan,
    },
    // {
    //   name: 'Shop',
    //   element: createBuy,
    // },
    {
      name: 'Info',
      element: createInfo,
    },
  ],
);
