import * as React from 'react';
import { Root, Grid, Row } from 'native-base';
import { Text } from 'react-native';
import { Provider } from 'react-redux';

import ProductCard from '../../components/ProductCard';

import Panel from '../../components/Panel';
/**
 * Container for application
 */
export default class Farmer extends React.Component<{}, {}> {
  /**
   * Render method for App
   */
  public render() {
    return (
      <Grid>
        <Row>
          <Panel title="Bea Esguerra">
            <Text>jejegroigsoho 
            ofihgoh</Text>
            </Panel>
        </Row>
        <Row>
          
        <ProductCard /></Row>
      </Grid>
    );
  }
}
