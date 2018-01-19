import * as React from 'react';
import { Root } from 'native-base';
import { View } from 'react-native';
import { Provider } from 'react-redux';

import NavContainer from './navigation';
import Drawer from './components/Drawer';
import Header from './components/Header';
import store from '../store';

import { modes, FarmerInformation } from './pages/FarmerInformation';

import Farmer from './pages/Farmer';

/**
 * Entry point for application
 */
export default class App extends React.Component<{}, {}> {

  /** Render the application */
  public render() {
    return (
      <Provider store={store}>
        <NavContainer />
      </Provider>
    );
  }
}

