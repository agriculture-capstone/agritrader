import * as React from 'react';
import { Root, Grid, Row, Col, Content, Button, Fab, Icon, Footer, FooterTab } from 'native-base';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
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
 * Container for Exports
 */
export default class Export extends React.Component<ExportPropTypes, {}> {
  // TODO need to connect this to the redux state
  /**
   * Render method for Exports
   */
  public render() {
    return (
      <Content>
        <View style={{ flex: 1 }}>
          <ScrollView>
            <Grid>
              <Row style={{ right: 10, width: 380 }}>
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
          </ScrollView>
          <View style={{ height: 40 }}>
            <Button full primary active style={{ flex: 1 }}>
              <Text style={{ fontSize: 20, color: 'white' }}>New Entry</Text>
            </Button>
          </View>
        </View>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  addEntryBtn: {
    //top: 195,
    right: -20,
    backgroundColor: 'red',
  },

});
