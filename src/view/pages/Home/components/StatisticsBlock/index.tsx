import * as React from 'react'; 
import { Root, Grid, Row, Col, Content, Button, Text, Card, Body, CardItem } from 'native-base';
import { StyleSheet, View } from 'react-native';


/**
 * Home Page Component
 */
export default class StatisticsBlock extends React.Component<{}, {}> {
    // TODO need to connect this to the redux state
    /**
     * Render method for Farmer
     */
  public render() {
      return (
       
                        <Col >
                        <Text   style={[styles.stats, styles.value]}>1,175</Text>
                        <Text   style={[styles.stats, styles.unit]}>L</Text>
                        <Text  style={[styles.stats, styles.label]}>Today</Text>
                        </Col>
                        
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
    label: {
        color: "gray"
    },
    unit : {

    }, 
    value : {

    }
});    
