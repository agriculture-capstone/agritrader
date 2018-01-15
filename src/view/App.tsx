import * as React from 'react';
import { Provider } from 'react-redux';

import store from '../store';
import Login from './pages/Login';
import { FakePage } from './pages/FakePage';
import { StartSession } from './pages/StartSession';

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
          <StartSession />
      </Provider>
    );
  }
}
