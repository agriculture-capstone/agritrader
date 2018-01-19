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
                        <Col><Text style={styles.label}> {"Friday, January 19, 2018".toUpperCase()}</Text></Col>
                        </Row>
                    <Row>
                        <StatisicsBlock value='1,175' units="L" label="Today"/> 
                        <StatisicsBlock value='2,250' units="L" label="Average Daily"/> 
                        
                        </Row>
<Row>
<StatisicsBlock value='7.4M' units="UGX" label="All Farmers Balance"/> 
                        <StatisicsBlock value='1.1M' units="UGX" label="Farmer Debts"/> 
                        </Row>
                    </Grid>
            </Panel>
            <View style={styles.menuButtons} >
            <CardButton title="Farmer Manager" iconName="people" iconColor="#383838"/>
            <CardButton title="Exports" iconName="car" iconColor="#383838" />
            <CardButton title="Warehouse Products" iconName="cart" iconColor="#383838"/>
            
            <CardButton title="View Records" iconName="stats" iconColor="#383838" />
                
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
    label: {
        textAlign: "center",
        color: "#383838"
    }
});    
