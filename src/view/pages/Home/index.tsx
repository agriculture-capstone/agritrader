import * as React from 'react'; 
import { Root, Grid, Row, Col, Content, Button, Text, Card, Body, CardItem } from 'native-base';
import { StyleSheet, View } from 'react-native';
import CardButton from '../../components/CardButton';
import Panel from '../../components/Panel';


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
                        <Col>
                        <Row><Text>1, 175 L</Text></Row>
                        <Row><Text>TODAY</Text></Row>
                        </Col>
                        <Col>
                        <Row><Text>2,250 L</Text></Row>
                        <Row><Text>AVERAGE DAY</Text></Row>
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
    }
});    
