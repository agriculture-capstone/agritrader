import * as React from 'react';
import createTabManager from '../../hoc/TabManager';
import Collect from './tabs/Collect';
import Loan from './tabs/Loan';
import Payment from './tabs/Payment';
import Info from './tabs/Info';

const createCollect = () => (
  <Collect />
);

const createLoan = () => (
  <Loan />
);

const createPayment = () => (
  <Payment />
);

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
    {
      name: 'Payment',
      element: createPayment,
    },
    {
      name: 'Info',
      element: createInfo,
    },
  ],
);
