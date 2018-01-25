import * as React from 'react';
import { Grid, Row, Content, Button, Text } from 'native-base';
import CardSummary from '../../../../components/CardSummary';
import DataTable from '../../../../components/DataTable';
import createPage from '../../../../generators/Page/index';

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
        <Grid>
          <Row>
          <CardSummary
          data={[{
            label: "Today",
            units: this.props.currentDayTotal,
            value: "",
          },{
            label: "This Week",
            units: this.props.currentWeekTotal,
            value: "",
          },{
            label: "This Month",
            units: this.props.currentMonthTotal,
            value: "",
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
