import * as React from 'react';
import { Root, Grid, Row, Col } from 'native-base';
import { Text, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import ProductCard from './components/ProductCard';
import Export from './tabs/Export';

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
      <Export
        allTimeTotal="6049L"
        currentWeekTotal="60L"
        currentMonthTotal="180L"
        exportValues={[
          { date: 'Jan 1 07:30', plate:'BRI8932', vol: 10 }, 
          { date: 'Jan 1 14:05', plate:'TJI6782', vol: 20 },
          { date: 'Jan 2 07:30', plate:'BRI8932', vol: 5 },
          { date: 'Jan 2 11:43', plate:'TIF6571', vol: 13 },
          { date: 'Jan 2 14:20', plate:'TJI6782', vol: 21 },
        ]}
      />
    );
  }
}
