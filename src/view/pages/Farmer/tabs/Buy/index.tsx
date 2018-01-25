import * as React from 'react';
import { Grid, Row, Content, Button, Text } from 'native-base';
import CardSummary from '../../../../components/CardSummary';
import DataTable from '../../../../components/DataTable';
import createPage from '../../../../generators/Page/index';
import styles from './style';

interface OwnPropsType {
  farmerName: string;
  currentDayTotal: string;
  currentWeekTotal: string;
  currentMonthTotal: string;
  purchaseTransactions: any[];
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
              label: "Today",
              value: this.props.currentDayTotal,
              units: "UGX",
            },{
              label: "This Week",
              value: this.props.currentWeekTotal,
              units: "UGX",
            },{
              label: "This Month",
              value: this.props.currentMonthTotal,
              units: "UGX",
            },
            ]}
          />
          </Row>
          <Row>
            <DataTable
              headers={['Date', 'Product', 'Quantity', 'Price']}
              values={this.props.purchaseTransactions}
            />
          </Row>
        </Grid>
        <Button block primary>
          <Text>
            BUY PRODUCTS
          </Text>
        </Button>
      </Content>
    );
  }
}

export default createPage(Buy);
