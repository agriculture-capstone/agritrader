import * as React from 'react';
import { Root, Grid, Row, Col } from 'native-base';
import { Text, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import ProductCard from './components/ProductCard';
import createTabManager from '../../generators/TabManager';
import Collect from './tabs/Collect';
import Loan from './tabs/Loan';
import Buy from './tabs/Buy';
import FarmerInformation from './tabs/FarmerInformation';

const createCollect = () => (
  <Collect
    farmerName="Bradley the Farmer"
    allTimeTotal="3944.L"
    currentWeekTotal="3.4L"
    currentMonthTotal="0.2L"
    collectionValues={[{ date:'Jan 1', am: 2, pm:2 }, { date:'Jan 1', am: 2, pm:2 }]}
  />
);

const createLoan = () => (
  <Loan
    farmerName="Bradley the Farmer"
    allTimeTotal="3944.L"
    currentWeekTotal="3.4L"
    currentMonthTotal="0.2L"
    collectionValues={[{ date:'Jan 1', remainingBalance: '$25', weeklyPayment: '$5' }]}
  />
);

const createBuy = () => (
  <Buy
    farmerName="Bradley the Farmer"
    allTimeTotal="$1001.01"
    currentWeekTotal="$50"
    currentMonthTotal="$405.50"
    collectionValues={[{ date:'Jan 1', product: "Cow Feed", quantity: "2", price: "6.50" }]}
  />
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
      name: 'Buy',
      element: createBuy,
    },
    {
      name: 'Information',
      element: () => <FarmerInformation />,
    },
  ],
);
