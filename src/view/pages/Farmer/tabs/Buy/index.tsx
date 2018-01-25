import * as React from 'react';
import { Grid, Row, Content, Button, Text } from 'native-base';
import CardSummary from '../../components/CardSummary';
import DataTable from '../../../../components/DataTable';
import createPage from '../../../../generators/Page/index';

interface OwnPropsType {
  farmerName: string;
  allTimeTotal: string;
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
        <Grid>
          <Row>
            <CardSummary
              title={this.props.farmerName}
              allTimeTotal={this.props.allTimeTotal}
              currentWeekTotal={this.props.currentWeekTotal}
              currentMonthTotal={this.props.currentMonthTotal}
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
