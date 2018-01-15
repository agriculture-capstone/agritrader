import * as React from 'react';
import { Root, Grid, Row, Col } from 'native-base';
import { Text, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import ProductCard from '../../components/ProductCard';

import Panel from '../../components/Panel';
/**
 * Container for application
 */

class FarmerCardInfo extends React.Component<{}, {}> {
  /**
   * Render method for App
   */
  public render() {
    return (
      
      <Grid >
        <Row>
          <Col>
            <Text style={styles.info}>This Week: 105.4L</Text>
          </Col>
          <Col>
            <Text style={styles.info}>This Month: 405.5L</Text>
          </Col>
        </Row>
        <Row>
          <Col><Text style={styles.info}>All-Time Total Amount: 2304.9L </Text></Col>
        </Row>
      </Grid>
    );
  }
}

export default class Farmer extends React.Component<{}, {}> {
  /**
   * Render method for App
   */
  public render() {
    return (
      <Grid>
        <Row>
          <Panel title="Bea Esguerra">
            <FarmerCardInfo />
          </Panel>
        </Row>
        <Row>
          <ProductCard />
        </Row>
      </Grid>
    );
  }
}

var styles = StyleSheet.create({
  info: {
    textAlign: "center",
  }
});