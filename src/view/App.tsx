import * as React from 'react';
import { Provider } from 'react-redux';

import store from '../store';
import Login from './pages/Login';

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
          <Login />
        </Root>
      </Provider>
    );
  }
}
