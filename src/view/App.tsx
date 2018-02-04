import 'es6-symbol/implement';
import * as React from 'react';
import { Root, Toast, ActionSheet, Spinner } from 'native-base';
import { Provider } from 'react-redux';

import SyncService from '../services/Sync';
import store, { persistor } from '../store';
import NavContainer from './navigation';
import { PersistGate } from 'redux-persist/lib/integration/react';

/**
 * Entry point for application
 */
export default class App extends React.Component {

  /** React componentWillUnmount */
  public componentWillUnmount() {
    // Stop the sync service
    SyncService.stop();

    // Reset toast and actionsheet in attempt to prevent an active bug in native-base
    (Toast as any).toastInstance = null;
    (ActionSheet as any).actionsheetInstance = null;
  }

  /** Render the application */
  public render() {
    return (
      <Root>
        <PersistGate persistor={persistor} loading={<Spinner color="red" />} >
          <Provider store={store}>
              <NavContainer />
          </Provider>
        </PersistGate>
      </Root>
    );
  }
}
