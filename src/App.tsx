/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ToolbarAndroid
} from 'react-native';
import Toolbar, { 
  LeftButtonTypes,
  ButtonIcons
} from './Components/Toolbar'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <Toolbar 
        title='Agritrader'
        rightButtons={[
          {title: 'button1', icon:ButtonIcons.account, 
          action: () => {console.log("Right Button1 Action")}},
          {title: 'button2', icon:ButtonIcons.settings, 
          action: () => {console.log("Right Button2 Action")}}
        ]}
        leftButtonType={LeftButtonTypes.menu}
        />
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  parentContainer: {
      flex: 1,
  },
  toolbar: {
      height: 56,
      backgroundColor: '#4883da',
  },
});