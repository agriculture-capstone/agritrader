import React, { Component } from 'react';  
import {  
  AppRegistry,
  Text,
  View,
  Navigator
} from 'react-native';

class ToolbarNav extends Component {

  _renderScene (route, navigator) {
    switch (route.id) {
      case 'home':
        return (
          <Home navigator={navigator}/>
        )
      case 'settings':
        return (
          <Text>Settings</Text>
        )
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{ id: 'home' }}
        renderScene={(route, navigator) => this._renderScene(route, navigator)}
      />
    );
  }
}

AppRegistry.registerComponent('ToolbarNav', () => ToolbarNav);  