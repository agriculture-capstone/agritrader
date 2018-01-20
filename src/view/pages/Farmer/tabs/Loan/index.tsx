import * as React from 'react';
import { Root, Grid, Row, Col, Content, Button, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import LoanSummary from '../../components/LoanSummary';
import LoansTable from '../../components/LoansTable';
import createPage from '../../../../generators/Page/index';

interface CollectPropsType {
  farmerName: string;
  totalRemainingBalance: string,
  totalWeeklyPaymentBalence: string,
  collectionValues: any[];
}

/**
 * Collect Tab Component
 */
class Collect extends React.Component<CollectPropsType, {}> {

  // TODO: need to connect this to the redux state
  /**
   * Render method for Farmer
   */
  public render() {
    return (
      <Content>
        <Grid>
          <Row>
            <LoanSummary 
                title={this.props.farmerName}
                totalRemainingBalance={this.props.totalRemainingBalance}
                totalWeeklyPaymentBalence={this.props.totalWeeklyPaymentBalence}
            />
          </Row>
          <Row>
            <LoansTable
              values={this.props.collectionValues}
            />
          </Row>
        </Grid>
        <Row>
            <Col>
                 
                <Button danger block style={{margin: 5}}>
                    <Text style={{color: "white"}}> PAY </Text>
                </Button>
            
            </Col><Col><Button block info style={{margin: 5}}>
          <Text>
            ADD LOAN
          </Text>
        </Button></Col></Row>
      </Content>
    );
  }
}

export default createPage(Collect);
