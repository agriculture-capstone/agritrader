import * as React from 'react';
import { Root, Grid, Row, Col } from 'native-base';
import { Text, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import ProductCard from './components/ProductCard';
import createTabManager from '../../lib/generators/TabManager';
import Collect from './tabs/Collect';
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

export default createTabManager(
  [
    {
      name: 'Collect',
      element: createCollect,
    },
    {
      name: 'Information',
      element: () => <FarmerInformation />,
    },
  ],
);
