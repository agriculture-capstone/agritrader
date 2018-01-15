import * as React from 'react';
import { Provider } from 'react-redux';

import store from '../store';
import NavContainer from './navigation';

import { modes, FarmerInformation } from './pages/FarmerInformation';

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

