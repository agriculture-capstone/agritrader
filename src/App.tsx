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
  ToolbarAndroid,
  TouchableOpacity
} from 'react-native';

var navigator

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});

export default class App extends React.Component<{}, {}> {
  _navigateToSettings() {
    this.props.navigator.push({
      id: 'settings'
    });
  }

  _onActionSelected() {
    this._navigateToSettings()
  }
  render() {
    return (
      <View style={styles.parentContainer}>
        <ToolbarAndroid
          title='Home'
          //logo={require('../images/logo.png')}
          actions={toolbarActions}
          style={styles.toolbar}
          titleColor='white'
          onActionSelected={() => this._onActionSelected()}
        />
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this._navigateToSettings()
            }
            }>
            <Text style={styles.buttonText}>Go to Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
  },
  toolbar: {
    height: 56,
    backgroundColor: '#4883da',
  },
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
});
