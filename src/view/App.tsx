import * as React from 'react';
import { Provider } from 'react-redux';

import store from '../store';
import Login from './pages/Login';
import { FakePage } from './pages/FakePage';
import { StartSession } from './pages/StartSession';

/**
 * Test data to pass in as list
 */

const farmerList = [{ name: 'Nick', phoneNumber: '1234', id: 1 },
                    { name: 'Nick2', phoneNumber: '1234', id: 2 }];


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
          <StartSession listItems={farmerList}/>
      </Provider>
    );
  }
}
