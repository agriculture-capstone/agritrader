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
  getFarmerPaymentBalance,
  getFarmerTotalBalance,
  getFormattedFarmersTransactions,
} from '../../../../../store/modules/payment/selectors';
import styles from './style';

/** Payment OwnPropsType */
interface OwnPropsType {
}

/** Payment DispatchPropsType */
interface DispatchPropsType {
  navigate(route: Route): void;
  setActivePaymentEntry(uuid: string): void;
  navigateToPaymentEntry(): void;
}

/** Payment StorePropsType */
interface StorePropsType {
  farmerPaymentBalance: string;
  farmerTotalBalance: string;
  paymentTransactions: any[];
}

/** Payment OwnStateType */
interface OwnStateType {
}

/** Payment NestedPropsType */
type NestedPropsType = StorePropsType & DispatchPropsType & OwnPropsType;

/** Payment PropsType */
type PropsType = NestedPropsType & InjectedFabProps;

/** Payment Tab Component */
class Payment extends React.Component<PropsType, OwnStateType> {

  private onAddPress = () => this.props.navigate(Route.ADD_PAYMENT_ENTRY);
  private onPressEntry = (uuid: string) => {
    return () => {
      this.props.setActivePaymentEntry(uuid);
      this.props.navigateToPaymentEntry();
    };
  }

  /** React componentDidMount */
  public componentDidMount() {
    this.props.listenToFab(this.onAddPress);
  }

  /** Render method for Payment */
  public render() {
    /** A brief summary at the top of the page */
    const paymentDataSummary = [
      {
        label: 'Balance',
        value: this.props.farmerTotalBalance,
        units: 'UGX',
      },
    ];

    return (
      <Content style={styles.container}>
        <Grid style={styles.content}>
          <Row>
            <CardSummary
              data={paymentDataSummary}
            />
          </Row>
          <Row>
            <DataTable
              headers={['Date', 'Amount']}
              values={dateSort.sortDescending(this.props.paymentTransactions)}
              onPressEntry={this.onPressEntry}
            />
          </Row>
        </Grid>
      </Content>
    );
  }
}

const PaymentPage = new Composer<NestedPropsType>(Payment)
  .fab()
  .page;

const mapStateToProps: MapStateToProps<StorePropsType, OwnPropsType, State> = (state) => {
  return {
    farmerPaymentBalance: getFarmerPaymentBalance(state),
    paymentTransactions: getFormattedFarmersTransactions(state),
    // TODO: Make selector for total balance including payments
    farmerTotalBalance: getFarmerTotalBalance(state),
  };
};
  
const mapDispatchToProps: MapDispatchToProps<DispatchPropsType, OwnPropsType> = (dispatch) => {
  return {
    navigate: (route: Route) => dispatch(navActions.navigateTo(route)),
    setActivePaymentEntry: (uuid: string) => dispatch(activeRowsActions.setActivePaymentEntry(uuid)),
    navigateToPaymentEntry: () => dispatch(navActions.navigateTo(Route.PAYMENT_ENTRY_DETAILS)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentPage);
