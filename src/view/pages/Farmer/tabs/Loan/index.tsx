import * as React from 'react';
import { Grid, Row, Content } from 'native-base';
import CardSummary from '../../../../components/CardSummary';
import DataTable from '../../../../components/DataTable';
import Composer from '../../../../hoc/PageComposer';

import { InjectedFabProps } from '../../../../hoc/PageComposer/FabPage';
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import activeRowsActions from '../../../../../store/modules/activeRows/actions';
import navActions from '../../../../../store/modules/nav/actions';
import { Route } from '../../../../navigation/routes';
import { State } from '../../../../../store/types';
import { dateSort } from '../../../../../utils/DateSort';
import {
  getFarmerLoanBalance,
  getFarmerTotalBalance,
  getFormattedFarmersTransactions,
} from '../../../../../store/modules/loan/selectors';
import styles from './style';

interface OwnPropsType {
}

interface DispatchPropsType {
  navigate(route: Route): void;
  setActiveLoanEntry(uuid: string): void;
  navigateToLoanEntry(): void;
}

interface StorePropsType {
  farmerLoanBalance: string;
  farmerTotalBalance: string;
  loanTransactions: any[];
}

interface OwnStateType {
}

/** Loan NestedPropsType */
type NestedPropsType = StorePropsType & DispatchPropsType & OwnPropsType;

/** Loan PropsType */
type PropsType = NestedPropsType & InjectedFabProps;

/** Loan Tab Component */
class Loan extends React.Component<PropsType, OwnStateType> {

  private onAddPress = () => this.props.navigate(Route.ADD_LOAN_ENTRY);
  private onPressEntry = (uuid: string) => {
    return () => {
      this.props.setActiveLoanEntry(uuid);
      this.props.navigateToLoanEntry();
    };
  }

  /** React componentDidMount */
  public componentDidMount() {
    this.props.listenToFab(this.onAddPress);
  }

  /**
  * Render method for Loan
  */
  public render() {
    /** A brief summary at the top of the page */
    const loanDataSummary = [
      {
        label: 'Total Loan Balance',
        value: this.props.farmerLoanBalance,
        units: 'UGX',
      },
      {
        label: 'Weekly Balance',
        value: this.props.farmerTotalBalance,
        units: 'UGX',
      },
    ];

    return (
      <Content style={styles.container}>
        <Grid style={styles.content}>
          <Row>
            <CardSummary
              data={loanDataSummary}
            />
          </Row>
          <Row>
            <DataTable
              headers={['Date', 'Amount']}
              values={dateSort.sortDescending(this.props.loanTransactions)}
              onPressEntry={this.onPressEntry}
            />
          </Row>
        </Grid>
      </Content>
    );
  }
}

const LoanPage = new Composer<NestedPropsType>(Loan)
  .fab()
  .page;

const mapStateToProps: MapStateToProps<StorePropsType, OwnPropsType, State> = (state) => {
  return {
    farmerLoanBalance: getFarmerLoanBalance(state),
    loanTransactions: getFormattedFarmersTransactions(state),
    farmerTotalBalance: getFarmerTotalBalance(state),
  };
};
  
const mapDispatchToProps: MapDispatchToProps<DispatchPropsType, OwnPropsType> = (dispatch) => {
  return {
    navigate: (route: Route) => dispatch(navActions.navigateTo(route)),
    setActiveLoanEntry: (uuid: string) => dispatch(activeRowsActions.setActiveLoanEntry(uuid)),
    navigateToLoanEntry: () => dispatch(navActions.navigateTo(Route.LOAN_ENTRY_DETAILS)),
  };
};
  
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoanPage);
