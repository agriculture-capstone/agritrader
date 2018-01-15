import { Container, Content } from 'native-base';
import { NavigationState, addNavigationHelpers } from 'react-navigation';
import { connect, DispatchProp, MapStateToProps } from 'react-redux';
import * as React from 'react';

import Header from '@/view//components/Header';
import Drawer from '@/view/components/Drawer';
import { State } from '@/store/types';
import Navigator from './navigator';

interface StoreProps {
  nav: NavigationState;
}

/** AppNavigation props */
type Props = DispatchProp<State> & StoreProps;

/** Container wrapping app with react-navigation */
class AppNavigation extends React.Component<Props, {}> {

  private navHelpers() {
    return addNavigationHelpers({
      dispatch: (this.props.dispatch as any),
      state: this.props.nav,
    });
  }

  /** Render the navigator */
  public render () {
    return (
      <Container>
        <Drawer>
          <Header />
          <Navigator navigation={this.navHelpers()} />
        </Drawer>
      </Container>
    );
  }
}

/****************************** Redux ******************************/

const mapStateToProps: MapStateToProps<StoreProps, {}, State> = (state, ownProps) => {
  return {
    nav: state.nav,
  };
};

// Tie navigation into redux store
const NavContainer = connect(
  mapStateToProps,
)(AppNavigation);

export default NavContainer;
