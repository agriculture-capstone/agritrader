import { Container, Toast } from 'native-base';
import { BackHandler } from 'react-native';
import { NavigationState, addNavigationHelpers, NavigationActions } from 'react-navigation';
import { connect, DispatchProp, MapStateToProps } from 'react-redux';
import * as React from 'react';

import Header from '../../view//components/Header';
import Drawer from '../../view/components/Drawer';
import { State } from '../../store/types';
import Navigator, { Route } from './navigator';

interface StoreProps {
  nav: NavigationState;
  headerShown: boolean;
}

/** AppNavigation props */
type Props = DispatchProp<State> & StoreProps;

/** Container wrapping app with react-navigation */
class AppNavigation extends React.Component<Props, {}> {
  private readonly CLOSE_APP_RESET_DURATION = 3000;
  private readonly CLOSE_APP_TOAST_MSG = 'Press again to close app';

  private closeApp: boolean;

  public constructor(props: Props) {
    super(props);

    this.onBackPress = this.onBackPress.bind(this);
  }

  private onBackPress() {
    const { dispatch, nav } = this.props;
    if (nav.index === 0 || nav.routes[nav.index - 1].routeName === Route.LOGIN) {
      if (nav.index === 0 || this.closeApp) {
        return false;
      } else {
        this.closeApp = true;
        setTimeout(() => (this.closeApp = false), this.CLOSE_APP_RESET_DURATION);
        Toast.show({
          text: this.CLOSE_APP_TOAST_MSG,
          position: 'bottom',
          buttonText: 'Okay',
        });
        return true;
      }
    }
    dispatch && dispatch(NavigationActions.back());
    return true;
  }

  private navHelpers() {
    return addNavigationHelpers({
      dispatch: (this.props.dispatch as any),
      state: this.props.nav,
    });
  }

  public componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  public componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  /** Render the navigator */
  public render () {
    return (
      <Drawer>
        <Container>
          {this.props.headerShown && <Header />}
          <Navigator navigation={this.navHelpers()} />
        </Container>
      </Drawer>
    );
  }
}

/****************************** Redux ******************************/

const mapStateToProps: MapStateToProps<StoreProps, {}, State> = (state, ownProps) => {
  return {
    nav: state.nav,
    headerShown: state.header.shown,
  };
};

// Tie navigation into redux store
export default connect(
  mapStateToProps,
)(AppNavigation);
