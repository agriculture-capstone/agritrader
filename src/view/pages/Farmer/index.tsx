import * as React from 'react';
import createTabManager from '../../hoc/TabManager';
import Collect from './tabs/Collect';
import Loan from './tabs/Loan';
// import Buy from './tabs/Buy';
import Info from './tabs/Info';

const createCollect = () => (
  <Collect />
);

const createLoan = () => (
  <Loan />
);

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
