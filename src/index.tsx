import React, { Component } from 'react';  
import { 
    AppRegistry,
    Text,
    View,
    Navigator
} from 'react-native';
import App from './App';

AppRegistry.registerComponent('agritrader', () => App);

class ToolbarNav extends Component {

  _renderScene (route, navigator) {
    switch (route.id) {
      case 'App':
        return (
          <App navigator={navigator}/>
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
        initialRoute={{ id: 'App' }}
        renderScene={(route, navigator) => this._renderScene(route, navigator)}
      />
    );
  }
}

AppRegistry.registerComponent('ToolbarNav', () => ToolbarNav);  
