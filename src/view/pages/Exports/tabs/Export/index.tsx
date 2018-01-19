import * as React from 'react';
import { Root, Grid, Row, Col, Content, Button, Fab, Icon } from 'native-base';
import { Text, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import CardSummary from '../../components/CardSummary';
import ProductCard from '../../components/ProductCard';

interface ExportPropTypes {
  allTimeTotal: string;
  currentWeekTotal: string;
  currentMonthTotal: string;

  exportValues: Array<any>;
}


/**
 * Container for Farmer
 */
export default class Export extends React.Component<ExportPropTypes, {}> {
  // TODO need to connect this to the redux state
  /**
   * Render method for Farmer
   */
  public render() {
    return (
      <Content padder scrollEnabled={true}>

        <Grid>
          <Row style={{ right: 17, width: 370 }}>
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
          <Row >
            <Button full primary style={{ flex: 1 }}>
              <Text style={{ fontSize: 20, color: 'white' }}>New Entry</Text>
            </Button>
          </Row>
        </Grid>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  addEntryBtn: {
    //top: 195,
    right: -20
    backgroundColor: 'red',
  },

});
