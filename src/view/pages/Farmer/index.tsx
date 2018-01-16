import * as React from 'react';
import { Root, Grid, Row, Col } from 'native-base';
import { Text, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import ProductCard from './components/ProductCard';
import Collect from './tabs/Collect';

/**
 * Container for Farmer
 */
export default class Farmer extends React.Component<{}, {}> {
  /**
   * Render method for Farmer
   */
  public render() {
    // TODO based on the active tab, we will decide which tab to render
    return (
      <Collect 
        farmerName="Bradley the Farmer"
        allTimeTotal="3944.L"
        currentWeekTotal="3.4L"
        currentMonthTotal="0.2L"
        collectionValues={[{ date:'Jan 1', am: 2, pm:2 }, { date:'Jan 1', am: 2, pm:2 }]}
      />
    );
  }
}
