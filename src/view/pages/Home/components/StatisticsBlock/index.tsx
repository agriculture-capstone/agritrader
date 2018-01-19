import * as React from 'react'; 
import { Root, Grid, Row, Col, Content, Button, Text, Card, Body, CardItem } from 'native-base';
import { StyleSheet, View } from 'react-native';


interface StatisticsBlockPropsType {
    value: string,
    units: string,
    label: string
}
/**
 * StatisticsBlock Component
 */
export default class StatisticsBlock extends React.Component<StatisticsBlockPropsType, {}> {
    // TODO need to connect this to the redux state
    /**
     * Render method for Farmer
     */
  public render() {
      return (
       
                        <Col style={styles.content} >
                        <Text   style={[styles.stats, styles.value]}>{this.props.value} <Text   style={[styles.stats, styles.unit]}>{this.props.units}</Text></Text>
                        
                        <Text  style={[styles.stats, styles.label]}>{this.props.label.toUpperCase()}</Text>
                        
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
        color: "gray", 
        fontSize: 12,
    },
    unit : {

    }, 
    value : {
        fontSize: 28
    },
    content: {
        padding: 5
    }
});    
