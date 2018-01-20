import * as React from 'react';
import { Root, Grid, Row, Col } from 'native-base';
import { Text, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import Panel from '../../../../components/Panel';

interface LoanSummaryPropsType {
  title: string;
  totalRemainingBalance: string; 
  totalWeeklyPaymentBalence: string;
}

/**
 * Container for CardSummary
 */
export default class LoanSummary extends React.Component<LoanSummaryPropsType, {}> {
    /**
     * Render method for CardSummary
     */
  public render() {
      return (
        <Panel title={this.props.title} expandable={true}>
        <Grid >
          <Row>
            <Col>
              <Text style={styles.info}>
                <Text style={styles.label}>This Week: </Text> 
                    {this.props.totalRemainingBalance}
                </Text>
            </Col>
            <Col>
              <Text style={styles.info}>
                <Text style={styles.label}>This Month: </Text>
                    {this.props.totalWeeklyPaymentBalence}
                </Text>
            </Col>
          </Row>
        </Grid>
        </Panel>
      );
    }
}

  
let styles = StyleSheet.create({
  info: {
      textAlign: 'center',
      padding: 5,
    },
  label: {
      fontWeight: 'bold',
    },
});
