import * as React from 'react';
import { Root, Grid, Row, Col, Content, Button, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import CardSummary from '../../components/CardSummary';
import ProductCard from '../../components/ProductCard';
import Page from '../../../../lib/baseComponents/Page/index';

interface ExportPropTypes {
  allTimeTotal: string;
  currentWeekTotal: string;
  currentMonthTotal: string;
  exportValues: any[];
}

/**
 * Container for Exports
 */
export default class Export extends React.Component<ExportPropTypes, {}> {
  // TODO need to connect this to the redux state
  /**
   * Render method for Exports
   */
  public render() {
    return (
      <Content style={{ backgroundColor: 'white' }}>
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
        <Button block info>
          <Text>
            ADD ENTRY
          </Text>
        </Button>
      </Content>
    );
  }
}
