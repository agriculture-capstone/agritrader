import * as React from 'react';
import { Root, Grid, Row, Col } from 'native-base';
import { Text } from 'react-native';
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
      <Grid>
        <Row>
          <Col>
            <Text> Hi </Text>
          </Col>
          <Col>
            <Text> Hello </Text>
          </Col>
        </Row>
        <Row>
          <Text> Last </Text>
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
