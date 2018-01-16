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
    return (
      <Collect />
    );
  }
}
