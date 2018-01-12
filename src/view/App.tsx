import * as React from 'react';
import { Root, Container, Header, Content } from 'native-base';
import { View } from 'react-native';
import { Provider } from 'react-redux';

import Drawer from './components/Drawer';
import store from '../store';

import Farmer from './pages/Farmer';

/**
 * Container for application
 */
export default class App extends React.Component<{}, {}> {
  /**
   * Render method for App
   */
  public render() {
    return (
      <Container>
        <Header/>
          <Content>
            <Farmer />
          </Content>
        
      </Container>
    );
  }
}
