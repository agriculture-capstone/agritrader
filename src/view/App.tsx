import store from '../store';
import * as React from 'react';
import { Root, Toast, ActionSheet } from 'native-base';
import { Provider } from 'react-redux';
import NavContainer from './navigation';


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
