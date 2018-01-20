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
    collectionValues={[{ date:'Jan 4', am: 2, pm:2 }, { date:'Jan 3', am: 2, pm:2 }, { date:'Jan 2', am: 2, pm:2 }, { date:'Jan 1', am: 2, pm:2 }]}
  />
);

const createLoan = () => (
  <Loan
    farmerName="Bradley the Farmer"
    totalWeeklyPaymentBalence="$5"
    totalRemainingBalance="$35"
    collectionValues={[
      { date:'Jan 19', remainingBalance: '$25', weeklyPayment: '$5' },
      { date:'Jan 18', remainingBalance: '$10', weeklyPayment: '$10' },
      { date:'Jan 17', remainingBalance: '$10', weeklyPayment: '$50' },
      { date:'Jan 16', remainingBalance: '$20', weeklyPayment: '$5' },
      { date:'Jan 15', remainingBalance: '$10', weeklyPayment: '$12' }
    ]}
  />
);

const createBuy = () => (
  <Buy
    farmerName="Bradley the Farmer"
    allTimeTotal="$1001.01"
    currentWeekTotal="$50"
    currentMonthTotal="$405.50"
    collectionValues={[
      { date:'Jan 19', product: "Cow Feed", quantity: "2", price: "6.50" },
      { date:'Jan 18', product: "Soap", quantity: "2", price: "6.00" },
      { date:'Jan 17', product: "Cow Feed", quantity: "2", price: "6.50" },
      { date:'Jan 16', product: "Soap", quantity: "2", price: "6.00" },
      { date:'Jan 15', product: "Soap", quantity: "1", price: "3.00" },
    ]}
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
      name: 'Info',
      element: () => <FarmerInformation />,
    },
  ],
);
