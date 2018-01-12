import * as React from 'react';
import { Root as NativeBaseRoot } from 'native-base';
import { View } from 'react-native';
import { Provider, DispatchProp, connect, MapStateToProps } from 'react-redux';
import { addNavigationHelpers, NavigationState } from 'react-navigation';

import Drawer from './components/Drawer';
import Header from './components/Header';
import store from '../store';
import { State } from '../store/types';
import Navigator from '../navigation';

interface StoreProps {
  nav: NavigationState;
}

type Props = DispatchProp<State> & StoreProps;

class AppNavigation extends React.Component<Props, {}> {

  private navHelpers() {
    return addNavigationHelpers({
      dispatch: (this.props.dispatch as any),
      state: this.props.nav,
    });
  }

  /** Render the navigator */
  public render () {
    return <Navigator navigation={this.navHelpers()} />;
  }

  /****************************** Redux ******************************/

  public static mapStateToProps: MapStateToProps<StoreProps, {}, State> = (state, ownProps) => {
    return {
      nav: state.nav,
    };
  }
}

// Tie navigation into redux store
const AppNavigationContainer = connect(
  AppNavigation.mapStateToProps,
)(AppNavigation);

/**
 * Entry point for application
 */
export default class App extends React.Component<{}, {}> {

  /** Render the application */
  public render() {
    return (
      <Provider store={store}>
        <AppNavigationContainer />
      </Provider>
    );
  }
}
