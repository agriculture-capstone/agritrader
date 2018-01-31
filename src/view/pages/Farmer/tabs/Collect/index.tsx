import * as React from 'react';
import { Grid, Row, Content } from 'native-base';
import CardSummary from '../../../../components/CardSummary';
import DataTable from '../../../../components/DataTable';
import Composer from '../../../../hoc/PageComposer';

import { InjectedFabProps } from '../../../../hoc/PageComposer/FabPage/index';
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import activeRowsActions from '../../../../../store/modules/activeRows/actions';
import navActions from '../../../../../store/modules/nav/actions';
import { Route } from '../../../../navigation/navigator';
import { State } from '../../../../../store/types';


import {
  getMonthlyFarmerMilkTotal,
  getWeeklyFarmerMilkTotal,
  getFormattedFarmersTransactions,
  getFarmerDayTotal,
} from '../../../../../store/modules/milk/selectors';
import styles from './style';

interface OwnPropsType {
}

interface DispatchPropsType {
  navigate(route: Route): void;
  setActiveMilkEntry(uuid: string): void;
  navigateToMilkEntry(): void;
}

interface StorePropsType {
  monthlyTotal: any;
  weeklyTotal: any;
  dailyTotal: any;
  collectTransactions: any[];
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

  public constructor(constructorProps: PropsType) {
    super(constructorProps);

    // Bindings
    this.createOnItemClicked = this.createOnItemClicked.bind(this);
  }

  private onAddPress = () => this.props.navigate(Route.ADD_MILK_ENTRY);
  // private onEntryPress = (route: Route) => this.props.navigate(route);
  private createOnItemClicked(uuid: string) {
    return () => {
      this.props.setActiveMilkEntry(uuid);
      this.props.navigateToMilkEntry();
    };
  }

  /** React componentDidMount */
  public componentDidMount() {
    this.props.listenToFab(this.onAddPress);
  }

  /**
   * Render method for Farmer
   */
  public render() {
    const dataSummary = [{
      label: 'Today',
      value: this.props.dailyTotal,
      units: 'L',
    },                   {
      label: 'This Week',
      value: this.props.weeklyTotal,
      units: 'L',
    },                   {
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
              data={dataSummary}
            />
          </Row>
          <Row>
            <DataTable
              headers={['Date', 'Volume', 'Quality', 'Rate']}
              values={this.props.collectTransactions}
              onPress={this.createOnItemClicked}
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

const mapStateToProps: MapStateToProps<StorePropsType, OwnPropsType, State> = (state) => {
  return {
    monthlyTotal: getMonthlyFarmerMilkTotal(state),
    weeklyTotal: getWeeklyFarmerMilkTotal(state),
    dailyTotal: getFarmerDayTotal(state),
    collectTransactions: getFormattedFarmersTransactions(state),
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchPropsType, OwnPropsType> = (dispatch) => {
  return {
    navigate: (route: Route) => dispatch(navActions.navigateTo(route)),
    setActiveMilkEntry: (uuid: string) => dispatch(activeRowsActions.setActiveMilkEntry(uuid)),
    navigateToMilkEntry: () => dispatch(navActions.navigateTo(Route.MILK_ENTRY_DETAILS)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CollectPage);
