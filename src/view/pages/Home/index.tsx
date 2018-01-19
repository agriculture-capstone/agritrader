import * as React from 'react'; 
import { Root, Grid, Row, Col, Content, Button, Text, Card, Body, CardItem } from 'native-base';
import { StyleSheet, View } from 'react-native';
import CardButton from '../../components/CardButton';
import Panel from '../../components/Panel';

import StatisicsBlock from './components/StatisticsBlock';


/**
 * Home Page Component
 */
export default class Home extends React.Component<{}, {}> {
    // TODO need to connect this to the redux state
    /**
     * Render method for Farmer
     */
  public render() {
      return (
        <Content>
            <Panel title="Trader Joe" expandable={false}> 
                <Grid>
                    <Row>
                        <StatisicsBlock /> 
                        <Col >
                        <Text   style={styles.stats}>1,175</Text>
                        <Text   style={styles.stats}>L</Text>
                        <Text  style={[styles.stats, styles.statsLabel]}>Today</Text>
                        </Col>
                        <Col>
                        <Text  style={styles.stats}>2,250</Text>
                        <Text   style={styles.stats}>L</Text>
                        <Text  style={[styles.stats, styles.statsLabel]}>Average Daily</Text>
                        </Col>
                        <Col >
                        <Text   style={styles.stats}>7.4M</Text>
                        <Text   style={styles.stats}>UGX</Text>
                        <Text  style={[styles.stats, styles.statsLabel]}>All Farmers Balance</Text>
                        </Col>
                        <Col>
                        <Text  style={styles.stats}>1.1M</Text>
                        
                        <Text   style={styles.stats}>UGX</Text>
                        <Text  style={[styles.stats, styles.statsLabel]}>Farmer Debts</Text>
                        </Col>
                        </Row>
                        <Row>
                       
                            </Row>

                    </Grid>
            </Panel>
            <View style={styles.menuButtons} >
            <CardButton title="Farmer Manager" iconName="people"/>
            <CardButton title="Warehouse Products" iconName="basket"/>
            <CardButton title="Exports" iconName="car"/>
            <CardButton title="View Records" iconName="stats" />
                
            </View>
        </Content>
        );
    }
}


let styles = StyleSheet.create({
    menuButtons : {
        marginRight: 10,
        marginLeft: 10
    },
    stats: {
        textAlign: "center"
    },
    statsLabel: {
        color: "gray"
    }
});    
