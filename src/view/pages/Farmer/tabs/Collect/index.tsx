import * as React from 'react';
import { Root, Grid, Row, Col } from 'native-base';
import { Text, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import CardSummary from '../../components/CardSummary';
import ProductCard from '../../components/ProductCard';

interface CollectPropsType {
  farmerName: string;
  allTimeTotal: string;
  currentWeekTotal: string;
  currentMonthTotal: string;

  collectionValues: Array<any>;
}


/**
 * Container for Farmer
 */
export default class Collect extends React.Component<CollectPropsType, {}> {
    // TODO need to connect this to the redux state
    /**
     * Render method for Farmer
     */
  public render() {
      return (
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
                    <ProductCard 
                        values={this.props.collectionValues}
                    />
                </Row>
            </Grid>
        );
    }
}
