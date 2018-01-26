import * as React from 'react';
import { Grid, Row, Col, Content, Button, Text } from 'native-base';
import CardSummary from '../../../../components/CardSummary';
import ProductCard from '../../components/ProductCard';
import Composer from '../../../../hoc/PageComposer';
import styles from './style';

interface OwnPropsType {
  farmerName: string;
  currentDayTotal: string;
  currentWeekTotal: string;
  currentMonthTotal: string;
  collectTransactions: any[];
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
      <Content style={styles.container}>
        <Grid style={styles.content}>
          <Row>
            <CardSummary
              data={[{
                label: 'Today',
                value: this.props.currentDayTotal,
                units: 'L',
              },     {
                label: 'This Week',
                value: this.props.currentWeekTotal,
                units: 'L',
              },     {
                label: 'This Month',
                value: this.props.currentMonthTotal,
                units: 'L',
              },

              ]}

            />
          </Row>
          <Row>
            <ProductCard
              values={this.props.collectTransactions}
            />
          </Row>
          <Row style={styles.addEntryButton}>
            <Col>
              <Button block primary >
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

export default new Composer<PropsType>(Collect)
  .page;
