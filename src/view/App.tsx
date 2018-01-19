import * as React from 'react';
import { Provider } from 'react-redux';

import store from '../store';
import NavContainer from './navigation';
import { FarmerList } from './pages/FarmerList';

/**
 * Entry point for application
 */
export default class App extends React.Component<{}, {}> {

  /** Render the application */
  public render() {
    return (
      <Provider store={store}>
        <FarmerList listItems={farmerList}/>
      </Provider>
    );
  }
}

const farmerList = [{ name: 'Swalleh', phoneNumber: '1-250-234-1234', id: 1 },
                    { name: 'James', phoneNumber: '1-526-123-8123', id: 2 },
                    { name: 'Alex', phoneNumber: '1-514-235-6789', id: 3 },
                    { name: 'James I.', phoneNumber: '1-922-789-2348', id: 2 },
                    { name: 'Bea', phoneNumber: '1-626-626-1236', id: 2 },
                    { name: 'Brad', phoneNumber: '1-789-231-2345', id: 2 },
                    { name: 'Enoch', phoneNumber: '1-899-781-8786', id: 2 },
                    { name: 'Moath', phoneNumber: '1-897-768-6780', id: 2 },
                    { name: 'Nick', phoneNumber: '1-123-564-2315', id: 2 },
                    { name: 'Farmer 239-XB4', phoneNumber: '1-011-101-1001', id: 2 }];
