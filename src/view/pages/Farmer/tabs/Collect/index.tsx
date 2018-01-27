import * as React from 'react';
import { Grid, Row, Col, Content, Button, Text } from 'native-base';
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import CardSummary from '../../components/CardSummary';
import ProductCard from '../../components/ProductCard';
import Composer from '../../../../hoc/PageComposer';
import { State } from '../../../../../store/types';
import { getMonthlyFarmerDairyTotal, getWeeklyFarmerDairyTotal, getFarmersTransactions } from '../../../../../store/modules/dairy/selectors';
import styles from './style';

interface OwnPropsType {
  farmerName: string;
  collectTransactions: any[];
}

interface DispatchPropsType {
}

interface StorePropsType {
  monthlyTotal: any;
  weeklyTotal: any;
  farmerTransactions: any[];
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
    return (
      <Content>
        <Grid>
          <Row>
            <CardSummary
              title={this.props.farmerName}
              currentWeekTotal={this.props.weeklyTotal}
              currentMonthTotal={this.props.monthlyTotal}
            />
          </Row>
          <Row>
            <ProductCard
              values={this.props.farmerTransactions}
            />
          </Row>
          <Row style={styles.addEntryButton}>
            <Col>
              <Button block info >
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
    farmerTransactions: getFarmersTransactions(state),
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
