import * as React from 'react';
import { Root, Grid, Row, Col } from 'native-base';
import { Text, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import Panel from '../../../../components/Panel';

/**
 * Container for CardSummary
 */
export default class CardSummary extends React.Component<{}, {}> {
    /**
     * Render method for CardSummary
     */
    public render() {
      return (
        <Panel title="Bea Esguerra">
        <Grid >
          <Row>
            <Col>
              <Text style={styles.info}><Text style={styles.label}>This Week: </Text> 105.4L</Text>
            </Col>
            <Col>
              <Text style={styles.info}><Text style={styles.label}>This Month: </Text>405.5L</Text>
            </Col>
          </Row>
          <Row>
            <Col><Text style={styles.info}><Text style={styles.label}>All-Time Total Amount: </Text>2304.9L </Text></Col>
          </Row>
        </Grid>
        </Panel>
      );
    }
  }

  
var styles = StyleSheet.create({
    info: {
      textAlign: "center",
      padding: 5
    },
    label: {
      fontWeight: "bold",
    }
  });