import { Container, Toast } from 'native-base';
import { BackHandler } from 'react-native';
import { NavigationState, addNavigationHelpers, NavigationActions } from 'react-navigation';
import { connect, DispatchProp, MapStateToProps, MapDispatchToProps } from 'react-redux';
import * as React from 'react';

import Header from '../../view/components/Header';
import Drawer from '../../view/components/Drawer';
import { State } from '../../store/types';
import Navigator, { routes, PageType, Route } from './navigator';
import headerActions from '../../store/modules/header/actions';
import drawerActions from '../../store/modules/drawer/actions';
import navActions from '../../store/modules/nav/actions';
import store from '../../store';

interface StoreProps {
  nav: NavigationState;
  headerShown: boolean;
  routeType: PageType | undefined;
}

interface DispatchProps {
  lockDrawer(): void;
  unlockDrawer(): void;
  hideHeader(): void;
  showHeader(): void;
  goBack(): void;
}

/** AppNavigation props */
type Props = StoreProps & DispatchProps;

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
    const { nav } = this.props;
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
    this.props.goBack();
    return true;
  }

  private navHelpers() {
    return addNavigationHelpers({
      dispatch: (store.dispatch as any),
      state: this.props.nav,
    });
  }

  public componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  public componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  public componentWillReceiveProps(nextProps: Props) {
    const type = nextProps.routeType;

    switch (type) {
      case 'back':
        this.props.showHeader();
        this.props.lockDrawer();
        break;

      case 'menu':
        this.props.showHeader();
        this.props.unlockDrawer();
        break;

      case 'empty':
        this.props.hideHeader();
        this.props.lockDrawer();
        break;

      default:
        throw new Error('should not be default case');
    }
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
  const routeName = state.nav.routes[state.nav.index].routeName;
  const currentRoute = routes.find(r => r.name === routeName);

  return {
    nav: state.nav,
    headerShown: state.header.shown,
    routeType: currentRoute && currentRoute.type,
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (dispatch) => {
  return {
    hideHeader: () => dispatch(headerActions.setHeaderShown(false)),
    showHeader: () => dispatch(headerActions.setHeaderShown(true)),
    lockDrawer: () => dispatch(drawerActions.setDrawerLocked(true)),
    unlockDrawer: () => dispatch(drawerActions.setDrawerLocked(false)),
    goBack: () => dispatch(navActions.goBack()),
  };
};

// Tie navigation into redux store
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppNavigation);
