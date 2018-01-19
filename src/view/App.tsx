import * as React from 'react';
import { Root, Toast, ActionSheet } from 'native-base';
import { View } from 'react-native';
import { Provider } from 'react-redux';

import NavContainer from './navigation';
import Drawer from './components/Drawer';
import Header from './components/Header';
import store from '../store';
import Login from './pages/Login';

import Farmer from './pages/Farmer';

/**
 * Entry point for application
 */
export default class App extends React.Component<{}, {}> {

  public componentWillUnmount() {
    (Toast as any).toastInstance = null;
    (ActionSheet as any).actionsheetInstance = null;
  }

  /** Render the application */
  public render() {
    return (
      <Root>
        <Provider store={store}>
            <NavContainer />
        </Provider>
      </Root>
    );
  }
}
