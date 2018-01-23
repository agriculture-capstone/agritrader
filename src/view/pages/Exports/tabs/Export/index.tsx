import * as React from 'react';
import { Grid, Row, Col, Content, Button, Text } from 'native-base';
import CardSummary from '../../components/CardSummary';
import ProductCard from '../../components/ProductCard';
import styles from '../../styles';
// import Page from '../../../../lib/baseComponents/Page/index';

interface OwnPropsType {
  allTimeTotal: string;
  currentWeekTotal: string;
  currentMonthTotal: string;
  exportValues: any[];
}
interface DispatchPropsType {
}

interface StorePropsType {
}

type PropsType = OwnPropsType & DispatchPropsType & StorePropsType;

interface OwnStateType {
}

/**
 * Container for Exports
 */
export default class Export extends React.Component<PropsType, OwnStateType> {
  // TODO need to connect this to the redux state
  /**
   * Render method for Exports
   */
  public render() {
    return (
      <Content style={styles.exportsContent}>
        <Grid>
          <Row>
            <CardSummary
              title={'Milk Exports'}
              allTimeTotal={this.props.allTimeTotal}
              currentWeekTotal={this.props.currentWeekTotal}
              currentMonthTotal={this.props.currentMonthTotal}
            />
          </Row>
          <Row>
            <ProductCard
              values={this.props.exportValues}
            />
          </Row>
        </Grid>
        <Row style={styles.addEntryButton}>
        <Col>
          <Button block info >
            <Text>
              ADD ENTRY
            </Text>
          </Button>
        </Col>
        </Row>
      </Content>
    );
  }
}
