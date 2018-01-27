import * as React from 'react';
import { Grid, Row, Col, Content, Button, Text } from 'native-base';
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';

import CardSummary from '../../../../components/CardSummary';
import DataTable from '../../../../components/DataTable';
import Composer from '../../../../hoc/PageComposer';
import { State } from '../../../../../store/types';
import {
  getMonthlyFarmerDairyTotal,
  getWeeklyFarmerDairyTotal,
  getFormattedFarmersTransactions,
  getDaysDairyTotal,
} from '../../../../../store/modules/dairy/selectors';
import styles from './style';

interface OwnPropsType {
  farmerName: string;
}

interface DispatchPropsType {
}

interface StorePropsType {
  monthlyTotal: any;
  weeklyTotal: any;
  dailyTotal: any;
  collectTransactions: any[];
}

type PropsType = OwnPropsType & DispatchPropsType & StorePropsType;

interface OwnStateType {
}

/**
 * Collect Tab Component
 */
class Collect extends React.Component<PropsType, OwnStateType> {
  /**
   * Render method for Farmer
   */
  public render() {
    const testData = [{
      label: 'Today',
      value: this.props.dailyTotal,
      units: 'L',
    },{
      label: 'This Week',
      value: this.props.weeklyTotal,
      units: 'L',
    },{
      label: 'This Month',
      value: this.props.monthlyTotal,
      units: 'L',
    },
    ];
    return (
      <Content style={styles.container}>
        <Grid style={styles.content}>
          <Row>
            <CardSummary
              data={testData}

            />
          </Row>
          <Row>
            <DataTable
              headers={['Date', 'Volume', 'quality', 'rate']}
              values={this.props.collectTransactions}
            />
          </Row>
          <Row style={styles.addEntryButton}>
            <Col>
              <Button block primary >
                <Text>
                  ADD ENTRY
                </Text>
              </Button>
            </Col>
          </Row>
        </Grid>
      </Content>
    );
  }
}

const collectPage = new Composer<PropsType>(Collect).page;

const mapStateToProps: MapStateToProps<StorePropsType, OwnPropsType, State> = (state) => {
  return {
    monthlyTotal: getMonthlyFarmerDairyTotal(state),
    weeklyTotal: getWeeklyFarmerDairyTotal(state),
    dailyTotal: getDaysDairyTotal(state),
    collectTransactions: getFormattedFarmersTransactions(state),
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchPropsType, OwnPropsType> = (dispatch) => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(collectPage);
