import * as React from 'react';
import { Grid, Row, Content } from 'native-base';
import Composer from '../../hoc/PageComposer';
import { Route } from '../../navigation/routes';
import styles from './style';
import DataTable from '../../components/DataTable';
import { State } from '../../../store/types';
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import navActions from '../../../store/modules/nav/actions';
// import activeRowsActions from '../../../store/modules/activeRows/actions';
import { getAllFormattedTransactions } from '../../../store/selectors';
import { dateSort } from '../../../utils/DateSort';

/** TransactionLog OwnPropsType */
interface OwnPropsType {}

/** TransactionLog DispatchPropsType */
interface DispatchPropsType {
  navigate(route: Route): void;
  // navigate to entry
  // navigateToEntry(): void;
  // setActiveEntry(uuid: string): void
  // setActiveFarmer(uuid: string): void
}

/** TransactionLog StorePropsType */
interface StorePropsType {
  transactions: any[];
}

/** TransactionLog OwnStateType */
interface OwnStateType {}

/** TransactionLog PropsType */
type PropsType = StorePropsType & DispatchPropsType & OwnPropsType;

/** TransactionLog NestedPropsType */
type NestedPropsType = StorePropsType & DispatchPropsType & OwnPropsType;

/** TransactionLog Container */
export class TransactionLog extends React.Component<PropsType, OwnStateType> {
  public constructor(constructorProps: PropsType) {
    super(constructorProps);
  }

  private onPressEntry = (uuid: string) => {
    return () => {

    };
  }

  /**
   * Render method for TransactionLog
   */
  public render() {
    return (
      <Content style={styles.container}>
        <Grid style={styles.contents}>
          <Row>
            <DataTable
              headers={['Date', 'Type', 'Amount']}
              values={dateSort.sortDescending(this.props.transactions)}
              onPressEntry={this.onPressEntry}
            />
          </Row>
        </Grid>
      </Content>
    );
  }
}

const TransactionLogPage = new Composer<NestedPropsType>(TransactionLog)
  .page;

const mapStateToProps: MapStateToProps<StorePropsType, OwnPropsType, State> = (state) => {
  return {
    transactions: getAllFormattedTransactions(state),
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchPropsType, OwnPropsType> = (dispatch) => {
  return {
    navigate: (route: Route) => dispatch(navActions.navigateTo(route)),
    // setActiveEntry: (uuid: string) => dispatch(activeRowsActions.setActiveEntry(uuid)),
    // navigateToEntry: () => dispatch(navActions.navigateTo(Route.ENTRY_DETAILS)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransactionLogPage);
