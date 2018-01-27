import * as React from 'react';
import { Grid, Row, Col, Content, Button, Text } from 'native-base';
import CardSummary from '../../../../components/CardSummary';
import DataTable from '../../../../components/DataTable';
import Composer from '../../../../hoc/PageComposer';

import { InjectedSearchProps } from '../../../../hoc/PageComposer/SearchPage/index';
import { InjectedFabProps } from '../../../../hoc/PageComposer/FabPage/index';
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import navActions from '../../../../../store/modules/nav/actions';
import { Route } from '../../../../navigation/navigator';
import { State } from '../../../../../store/types';


import styles from './style';

interface OwnPropsType {
  farmerName: string;
  currentDayTotal: string;
  currentWeekTotal: string;
  currentMonthTotal: string;
  collectTransactions: any[];
}

interface DispatchPropsType {
  navigate(route: Route): void;
}

interface StorePropsType {
}

interface OwnStateType {
}

type NestedPropsType = StorePropsType & DispatchPropsType & OwnPropsType;

/** FarmerSearch PropsType */
type PropsType = InjectedFabProps & NestedPropsType;

/**
 * Collect Tab Component
 */
class Collect extends React.Component<PropsType, OwnStateType> {

  private onAddPress = () => this.props.navigate(Route.ADD_MILK_ENTRY);

  public componentDidMount() {
    this.props.listenToFab(this.onAddPress);
  }

  /**
   * Render method for Farmer
   */
  public render() {
    const testData = [{
      label: 'Today',
      value: this.props.currentDayTotal,
      units: 'L',
    },                {
      label: 'This Week',
      value: this.props.currentWeekTotal,
      units: 'L',
    },                {
      label: 'This Month',
      value: this.props.currentMonthTotal,
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
              headers={['Date', 'AM', 'PM']}
              values={this.props.collectTransactions}
            />
          </Row>
        </Grid>
      </Content>
    );
  }
}

const CollectPage = new Composer<NestedPropsType>(Collect)
.fab()
.page;

const mapStateToProps: MapStateToProps<StorePropsType, OwnPropsType, State> = () => {
  return {};
};

const mapDispatchToProps: MapDispatchToProps<DispatchPropsType, OwnPropsType> = (dispatch) => {
  return {
    navigate: (route: Route) => dispatch(navActions.navigateTo(route)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CollectPage);
