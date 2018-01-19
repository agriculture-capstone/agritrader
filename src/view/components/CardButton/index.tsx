import * as React from 'react';
import { Root, Grid, Row, Col, Content, Button, Text, Card, Body, CardItem, Icon, Right, Left } from 'native-base';
import { StyleSheet } from 'react-native';


interface CardButtonPropsType {
    title: string,
    iconName: string,
    iconColor: string
}
/**
 * Home Page Component
 */
export default class CardButton extends React.Component<CardButtonPropsType, {}> {
    // TODO need to connect this to the redux state
    /**
     * Render method for Farmer
     */
    public render() {
        return (

            <Card >
                <CardItem>

                    <Left >
                        <Icon 
                            style={{
                                fontSize: 40, 
                                color: this.props.iconColor
                            }} 
                            name={this.props.iconName} 
                        />

                    <Body>
                        <Text>
                            {this.props.title}
                        </Text>
                    </Body>
                    </Left>
                    <Right>
                        <Icon name="ios-arrow-forward" />
                    </Right>

                </CardItem>
            </Card>

        );
    }
}


let styles = StyleSheet.create({
    arrow: {
        alignSelf: "flex-end",
    },
    card: {
        padding: 5
    }
});    
