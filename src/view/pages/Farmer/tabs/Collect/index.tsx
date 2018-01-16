import * as React from 'react';
import { Root, Grid, Row, Col } from 'native-base';
import { Text, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import CardSummary from '../../components/CardSummary';
import ProductCard from '../../components/ProductCard';

/**
 * Container for Farmer
 */
export default class Collect extends React.Component<{}, {}> {
    /**
     * Render method for Farmer
     */
    public render() {
        return (

            <Grid>
                <Row>
                        <CardSummary />
                    
                </Row>
                <Row>
                    <ProductCard />
                </Row>
            </Grid>
        );
    }
}
