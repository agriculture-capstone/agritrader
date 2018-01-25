import * as React from 'react';
import { Grid, Row, Col, Content, Button, Text } from 'native-base';
import CardSummary from '../../../../components/CardSummary';
import LoansTable from '../../components/LoansTable';
import createPage from '../../../../generators/Page/index';
import styles from './style';

interface OwnPropsType {
  farmerName: string;
  totalRemainingBalance: string,
  totalWeeklyPaymentBalence: string,
  loanTransactions: any[];
}

interface DispatchPropsType {
}

interface StorePropsType {
}
 
type PropsType = OwnPropsType & DispatchPropsType & StorePropsType; 

interface OwnStateType {
}

/**
 * Buy Tab Component
 */
class Buy extends React.Component<PropsType, OwnStateType> {
  /**
   * Render method for Buy
   */
  public render() {
    return (
      <Content>
        <Grid style={styles.container}>
          <Row>
          <CardSummary
          data={[{
            label: "Total Balance",
            value: this.props.totalRemainingBalance,
            units: "UGX",
          },{
            label: "Total Weekly Payment",
            value: this.props.totalWeeklyPaymentBalence,
            units: "UGX",
          },
          ]}
        />
          </Row>
          <Row>
            <LoansTable
              values={this.props.loanTransactions}
            />
          </Row>
        </Grid>
        <Button primary block style={{margin: 5}}>
        <Text style={{color: "white"}}> ADD LOAN </Text>
    </Button>

      </Content>
    );
  }
}

export default createPage(Buy);
