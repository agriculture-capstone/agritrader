import * as React from 'react';
import { Grid, Row, Content, Button, Text } from 'native-base';
import CardSummary from '../../../../components/CardSummary';
import DataTable from '../../../../components/DataTable';
import Composer from '../../../../hoc/PageComposer';

import styles from './style';
import {InjectedFabProps} from "../../../../hoc/PageComposer/FabPage";

interface OwnPropsType {
  farmerName: string;
  totalRemainingBalance: string;
  totalWeeklyPaymentBalence: string;
  loanTransactions: any[];
}

interface DispatchPropsType {
}

interface StorePropsType {
}



interface OwnStateType {
}

/** Loan NestedPropsType */
type NestedPropsType = StorePropsType & DispatchPropsType & OwnPropsType;

/** Loan PropsType */
type PropsType = NestedPropsType & InjectedFabProps;

/** Loan Tab Component */
class Loan extends React.Component<PropsType, OwnStateType> {

  private onPressEntry = (uuid: string) => {
    return () => {
      // example from collect
      // this.props.setActiveMilkEntry(uuid);
      // this.props.navigateToMilkEntry();
    };
  }
  /**
  * Render method for Loan
  */
  public render() {
    const testData = [{
      label: 'Total Balance',
      value: this.props.totalRemainingBalance,
      units: 'UGX',
    },                {
      label: 'Total Weekly Payment',
      value: this.props.totalWeeklyPaymentBalence,
      units: 'UGX',
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
              headers={['Date', 'Remaining Balance', 'Weekly Payment']}
              values={this.props.loanTransactions}
              onPressEntry={this.onPressEntry}
            />
          </Row>
        </Grid>
        <Button primary block style={{ margin: 5 }}>
          <Text style={{ color: 'white' }}> ADD LOAN </Text>
        </Button>
      </Content>
    );
  }
}

export default new Composer<PropsType>(Loan)
  .comingSoon()
  .page;
