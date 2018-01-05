import * as React from 'react';
import { Root } from 'native-base';
import { View } from 'react-native';

import Drawer from './components/Drawer';
import Header from './components/Header';

/**
 * Container for application
 */
export default class App extends React.Component<{}, {}> {
  /**
   * Render method for App
   */
  public render() {
    return (
      <Root>
        <Drawer>
          <View>
            <Header />
            <Drawer />
          </View>
        </Drawer>
      </Root>
    );
  }
}
