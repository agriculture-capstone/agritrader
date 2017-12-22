
import * as React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Toolbar, {
    LeftButtonTypes,
} from './Components/Toolbar';
import { icons } from './Assets';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
        'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

/**
 * Container for application
 */
export default class App extends React.Component<{}, {}> {
  /**
   * Render method for App
   */
  public render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Hello! This is the agritrader app!!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
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
