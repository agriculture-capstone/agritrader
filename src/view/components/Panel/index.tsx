import * as React from 'react';
import { Provider } from 'react-redux';

import { Container, Header, Content, List, ListItem, Grid, Row, Col } from 'native-base';
import {StyleSheet,Text,View,Image,TouchableHighlight,Animated} from 'react-native'; //Step 1

interface PanelStateType {
    expanded: boolean,
    animation?: Animated.Value,
    maxHeight?: any,
    minHeight?: any,
}
interface PanelPropsType {
    title: string
}

// Following this as a guide: https://moduscreate.com/blog/expanding-and-collapsing-elements-using-animations-in-react-native/
class Panel extends React.Component<PanelPropsType, PanelStateType> {
    
    icons: any;
    constructor(props: PanelPropsType){
        super(props);

        this.icons = {
            'up'    : "up", //require('./images/Arrowhead-01-128.png'),
            'down'  : "down" //require('./images/Arrowhead-Down-01-128.png')
        };

        this.state = {
            expanded    : true
        };
    }

    toggle(){
        let initialValue    = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue      = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({
            expanded : !this.state.expanded
        });

        if (!this.state.animation) 
        {
            this.setState({ animation: new Animated.Value(initialValue)});
        } else {
            this.state.animation.setValue(initialValue);
            Animated.spring(
                this.state.animation,
                {
                    toValue: finalValue
                }
            ).start();
        }
    }

    _setMaxHeight(event:any){
        this.setState({
            maxHeight   : event.nativeEvent.layout.height
        });
    }

    _setMinHeight(event:any){
        this.setState({
            minHeight   : event.nativeEvent.layout.height
        });
    }

    render(){
        let icon = this.icons['down'];

        if(this.state.expanded){
            icon = this.icons['up'];
        }

        return (
            <Animated.View 
                style={[styles.container,{height: this.state.animation}]}>
                <View style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <TouchableHighlight 
                        style={styles.button} 
                        onPress={this.toggle.bind(this)}
                        underlayColor="#f1f1f1">
                        <Text>{icon}</Text>
                    </TouchableHighlight>
                </View>
                
                <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
                    {this.props.children}
                </View>

            </Animated.View>
        );
    }
}

var styles = StyleSheet.create({
    container   : {
        backgroundColor: '#fff',
        margin:10,
        overflow:'hidden', 
        flex: 1,
    },
    titleContainer : {
        flexDirection: 'row'
    },
    title       : {
        flex    : 1,
        padding : 10,
        color   :'#2a2f43',
        fontWeight:'bold'
    },
    button      : {

    },
    buttonImage : {
        width   : 30,
        height  : 25
    },
    body        : {
        padding     : 10,
        paddingTop  : 0
    }
});

export default Panel;