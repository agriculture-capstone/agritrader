import * as React from 'react';
import { Grid, Row, Col, Text } from 'native-base';
import Panel from '../../../../components/Panel';
import styles from './style';

import createComingSoonOverlay from '../../../../components/ComingSoon';
import { connect } from 'react-redux';

interface OwnPropsType {
  title: string;
  totalRemainingBalance: string;
  totalWeeklyPaymentBalence: string;
}

interface DispatchPropsType {
}

interface StorePropsType {
}

type PropsType = OwnPropsType & DispatchPropsType & StorePropsType;

interface OwnStateType {
}


/**
 * Component for LoanSummary
 */
export class LoanSummary extends React.Component<PropsType, OwnStateType> {
  /**
   * Render method for Loan
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

const LoanSummaryPage = createComingSoonOverlay<PropsType>(LoanSummary);

export default connect(

)
(LoanSummaryPage);
