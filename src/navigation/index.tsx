import { NavigationState, addNavigationHelpers } from 'react-navigation';
import { connect, DispatchProp, MapStateToProps } from 'react-redux';
import * as React from 'react';

import { State } from '../store/types';
import Navigator from './navigator';

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
    return <Navigator navigation={this.navHelpers()}/>;
  }

  /****************************** Redux ******************************/

  public static mapStateToProps: MapStateToProps<StoreProps, {}, State> = (state, ownProps) => {
    return {
      nav: state.nav,
    };
  }
}

// Tie navigation into redux store
const NavContainer = connect(
  AppNavigation.mapStateToProps,
)(AppNavigation);

