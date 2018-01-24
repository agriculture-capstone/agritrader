import * as React from 'react';
import { Grid, Row, Col, Content, Button, Text } from 'native-base';
import CardSummary from '../../components/CardSummary';
import ProductCard from '../../components/ProductCard';
import createPage from '../../../../generators/Page/index';
import styles from './style';

interface OwnPropsType {
  farmerName: string;
  allTimeTotal: any;
  currentWeekTotal: any;
  currentMonthTotal: any;
  collectTransactions: any[];
}

interface Statistic {
  unit: string;
  value: string;
}
interface DispatchPropsType {
}

interface StorePropsType {
}

type PropsType = OwnPropsType & DispatchPropsType & StorePropsType;

interface OwnStateType {
}

/**
 * Collect Tab Component
 */
class Collect extends React.Component<PropsType, OwnStateType> {
  /**
   * Render method for Farmer
   */
  public render() {
    return (
      <Content>
        <Grid style={{margin: 10}}>
          <Row>
            <CardSummary
              title={this.props.farmerName}
              allTimeTotal={this.props.allTimeTotal}
              currentWeekTotal={this.props.currentWeekTotal}
              currentMonthTotal={this.props.currentMonthTotal}
            />
          </Row>
          <Row>
            <ProductCard
              values={this.props.collectTransactions}
            />
          </Row>
          <Row style={styles.addEntryButton}>
            <Col>
              <Button block info >
                <Text>
                  ADD ENTRY
                </Text>
              </Button>
            </Col>
          </Row>
        </Grid>
      </Content>
    );
  }
}

export default createPage(Collect);
