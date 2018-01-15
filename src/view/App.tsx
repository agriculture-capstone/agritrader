import * as React from 'react';
import { Root } from 'native-base';
import { View } from 'react-native';
import { Provider } from 'react-redux';

import Drawer from './components/Drawer';
import Header from './components/Header';
import store from '../store';

import { modes, FarmerInformation } from './pages/FarmerInformation';

/**
 * Container for application
 */
export default class App extends React.Component<{}, {}> {
  /**
   * Render method for App
   */
  public render() {
    return (
      <Provider store={store}>
        <Root>
          <FarmerInformation 
            mode={modes.add}
          />
        </Root>
      </Provider>
    );
  }
}
