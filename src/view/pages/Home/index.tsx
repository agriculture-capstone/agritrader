import * as React from 'react'; 
import { Root, Grid, Row, Col, Content, Button, Text, Card, Body, CardItem } from 'native-base';
import { StyleSheet } from 'react-native';
import CardButton from '../../components/CardButton';


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
            <Card>
                <CardItem>
                    <Body>
                        <Text>
                            Trader Joe
                        </Text>
                    </Body>
                </CardItem>
                </Card>
            <CardButton  />
                <Card>
                <CardItem>
                <Body>
                    <Text>
                        Warehouse Products 
                    </Text>
                </Body>
            </CardItem>
            </Card>
            <Card>
                <CardItem>
                <Body>
                    <Text>
                        Exports
                    </Text>
                </Body>
            </CardItem>
            </Card>
                <Card>
                
            <CardItem>
                <Body>
                    <Text>
                    View Records
                    </Text>
                </Body>
            </CardItem>
            </Card>
            
        </Content>
        );
    }
}
