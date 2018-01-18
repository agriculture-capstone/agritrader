import * as React from 'react'; 
import { Root, Grid, Row, Col, Content, Button, Text, Card, Body, CardItem } from 'native-base';
import { StyleSheet } from 'react-native';


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
       
            <Card>
                <CardItem>
                    <Body>
                        <Text>
                            Farmer Manager 
                        </Text>
                    </Body>
                </CardItem>
                </Card>
                
        );
    }
}
