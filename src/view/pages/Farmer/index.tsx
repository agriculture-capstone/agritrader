import * as React from 'react';
import { Root } from 'native-base';
import { Text } from 'react-native';
import { Provider } from 'react-redux';

import ProductCard from '../../components/ProductCard';

/**
 * Container for application
 */
export default class Farmer extends React.Component<{}, {}> {
  /**
   * Render method for App
   */
  public render() {
    return (
      <ProductCard />
    );
  }
}
