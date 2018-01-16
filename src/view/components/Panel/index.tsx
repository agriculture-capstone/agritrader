import * as React from 'react';
import { Provider } from 'react-redux';

import { Container, Header, Content, List, ListItem, Grid, Row, Col, Icon } from 'native-base';
import { StyleSheet,Text,View,Image,TouchableHighlight,Animated } from 'react-native'; //Step 1

interface PanelStateType {
  expanded: boolean;
  animation: Animated.Value;
  maxHeight?: any;
  minHeight?: any;
  arrowHeight?: any;
}
interface PanelPropsType {
  title: string;
}

// Following this as a guide: https://moduscreate.com/blog/expanding-and-collapsing-elements-using-animations-in-react-native/
class Panel extends React.Component<PanelPropsType, PanelStateType> {
    
  public icons: any;
  constructor(props: PanelPropsType) {
      super(props);

      this.icons = {
          up    : 'up', //require('./images/Arrowhead-01-128.png'),
          down  : 'down', //require('./images/Arrowhead-Down-01-128.png')
        };

      this.state = {
          expanded    : true,
          animation: new Animated.Value(0),
        };
    }

  public toggle() {
      const initialValue    = this.state.expanded ? this.state.maxHeight + this.state.minHeight + this.state.arrowHeight : this.state.minHeight + this.state.arrowHeight,
          finalValue      = this.state.expanded ? this.state.minHeight + this.state.arrowHeight : this.state.maxHeight + this.state.minHeight + this.state.arrowHeight;
      this.setState({
          expanded : !this.state.expanded,
        });

      this.state.animation.setValue(initialValue);
      Animated.spring(
                this.state.animation,
          {
            toValue: finalValue,
          },
            ).start();
        
    }

  public componentDidMount() {
      const initialValue    = this.state.expanded ? this.state.maxHeight + this.state.minHeight + this.state.arrowHeight : this.state.minHeight + this.state.arrowHeight;
      this.setState({ animation: new Animated.Value(initialValue) });

    }

  public _setMaxHeight(event:any) {
      if (this.state.expanded) {this.setState({
          maxHeight   : event.nativeEvent.layout.height,
        });}
    }

  public _setMinHeight(event:any) {
      this.setState({
          minHeight   : event.nativeEvent.layout.height,
        });
    }

  public _setArrowHeight(event:any) {
      this.setState({
          arrowHeight   : event.nativeEvent.layout.height,
        });
    }

  public render() {
      let icon = <Icon name="ios-arrow-down"/>;

      if (this.state.expanded) {
          icon = <Icon name="ios-arrow-up"/>;
        }

      return (
            <Animated.View 
                style={[styles.container,{ height: this.state.animation }]}>
                <View style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    
                </View>
                
                <View style={[styles.body, this.state.expanded ? styles.show : styles.hide]} onLayout={this._setMaxHeight.bind(this)}>
                    {this.props.children}
                </View>
                <TouchableHighlight 
                        style={styles.button} 
                        onPress={this.toggle.bind(this)}
                        underlayColor="#f1f1f1"
                        onLayout={this._setArrowHeight.bind(this)}
                        activeOpacity={0}
                        >
                        {icon}
                    </TouchableHighlight>

            </Animated.View>
        );
    }
}

let styles = StyleSheet.create({
  container   : {
      backgroundColor: '#fff',
      margin:10,
      overflow:'hidden', 
      flex: 1,
    },
  titleContainer : {
      flexDirection: 'row',
    },
  title       : {
      flex    : 1,
      padding : 10,
      color   :'#2a2f43',
      fontWeight:'bold',
      textAlign: 'center',
      fontSize: 32,
        
    },
  button      : {
      alignItems: 'center',
        
    },
  body        : {
      padding     : 10,
      paddingTop  : 0,
    },
  hide : {
      display: 'none',
    },
  show : {
      display: 'flex',
    },
});

export default Panel;
