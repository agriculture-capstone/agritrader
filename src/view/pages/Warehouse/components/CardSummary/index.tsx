import * as React from 'react';
import { Grid, Row, Col } from 'native-base';
import { Text } from 'react-native';

import Panel from '../../../../components/Panel';
import styles from './style';

interface OwnPropsType {
  title: string;
  currentWeekTotal: string;
  currentMonthTotal: string;
  allTimeTotal: string;
}

interface DispatchPropsType {
}

interface StorePropsType {
}

type PropsType = OwnPropsType & DispatchPropsType & StorePropsType;

interface OwnStateType {

}

/**
 * Container for CardSummary
 */
export default class CardSummary extends React.Component<PropsType, OwnStateType> {  
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
                {this.props.currentWeekTotal}
              </Text>
            </Col>
            <Col>
              <Text style={styles.info}>
                <Text style={styles.label}>This Month: </Text>
                {this.props.currentMonthTotal}
              </Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text style={styles.info}>
                <Text style={styles.label}>All-Time Total Amount: </Text>
                {this.props.allTimeTotal}
              </Text>
            </Col>
          </Row>
        </Grid>
      </Panel>
    );
  }
}

