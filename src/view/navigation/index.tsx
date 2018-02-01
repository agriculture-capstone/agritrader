import { Container, Toast, StyleProvider } from 'native-base';
import { BackHandler } from 'react-native';
import { NavigationState, addNavigationHelpers } from 'react-navigation';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import * as React from 'react';

import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import Header from '../../view/components/Header';
import Drawer from '../../view/components/Drawer';
import { State } from '../../store/types';
import Navigator, { routesInfo, PageType, Route } from './navigator';
import headerActions from '../../store/modules/header/actions';
import drawerActions from '../../store/modules/drawer/actions';
import searchBarActions from '../../store/modules/searchBar/actions';
import navActions from '../../store/modules/nav/actions';
import store from '../../store';
import { Farmer } from '../../store/modules/farmer/types';
import { getActiveFarmer } from '../../store/modules/farmer/selectors';

interface StorePropsType {
  nav: NavigationState;
  headerShown: boolean;
  routeName: string;
  routeType: PageType | undefined;
  searchBarShown: boolean;
  searchPlaceholder: string | undefined;
  currentFarmer: Farmer;
}

interface DispatchPropsType {
  lockDrawer(): void;
  unlockDrawer(): void;
  hideHeader(): void;
  showHeader(): void;
  goBack(): void;
  showSearch(placeholder?: string): void;
  hideSearch(): void;
  updateHeaderTitle(title: string): void;
}

/** AppNavigation props */
type PropsType = StorePropsType & DispatchPropsType;

/** Container wrapping app with react-navigation */
class AppNavigation extends React.Component<PropsType, {}> {
  private readonly CLOSE_APP_RESET_DURATION = 3000;
  private readonly CLOSE_APP_TOAST_MSG = 'Press again to close app';

  private closeApp: boolean;

  public constructor(props: PropsType) {
    super(props);

    // Bindings
    this.onBackPress = this.onBackPress.bind(this);
  }

  /** Handle the hardware back button being pressed */
  private onBackPress() {
    const CLOSE = false;
    const DO_NOT_CLOSE = true;

    const { nav } = this.props;

    // If the stack is empty
    if (nav.index === 0) {
      // If second time pressing button, close the application
      if (this.closeApp) {
        return CLOSE;
      } else {
        // First time closing app, setup to close app on second press
        this.closeApp = true;
        setTimeout(() => (this.closeApp = false), this.CLOSE_APP_RESET_DURATION);

        // Show a toast to the user
        Toast.show({
          text: this.CLOSE_APP_TOAST_MSG,
          position: 'bottom',
          buttonText: 'Okay',
        });

        return DO_NOT_CLOSE;
      }
    }

    // Go back in the navigation stack
    this.props.goBack();

    // Do not close application
    return DO_NOT_CLOSE;
  }

  /** Create navigation helpers */
  private navHelpers() {
    return addNavigationHelpers({
      dispatch: (store.dispatch as any),
      state: this.props.nav,
    });
  }

  /** Setup redux state depending on what route is active */
  private setHeaderAndDrawer(type: PageType | undefined) {
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
        throw new Error(`No such page type: ${type}`);
    }
  }

  /** Set redux search bar state */
  private setSearchBar(searchBarShown: boolean, placeholder?: string) {
    searchBarShown ? this.props.showSearch(placeholder) : this.props.hideSearch();
  }

  private setHeaderTitle(title: string, { firstName, lastName }: any) {
    if (title === 'Farmer') {
      const farmerName = `${firstName} ${lastName}`;
      this.props.updateHeaderTitle(farmerName);
    } else {
      this.props.updateHeaderTitle(title);
    }
  }

  /****************************** React ******************************/

  /** React componentWillMount */
  public componentWillMount() {
    this.setHeaderAndDrawer(this.props.routeType);
    this.setHeaderTitle(this.props.routeName, this.props.currentFarmer);
    this.setSearchBar(this.props.searchBarShown, this.props.searchPlaceholder);
  }

  /** React componentDidMount */
  public componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  /** React componentWillUnmount */
  public componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  /** React componentWillReceiveProps */
  public componentWillReceiveProps(nextProps: PropsType) {
    if (nextProps.routeType !== this.props.routeType) {
      const type = nextProps.routeType;
      this.setHeaderAndDrawer(type);
    }
    if (nextProps.routeName !== this.props.routeName) {
      this.setHeaderTitle(nextProps.routeName, nextProps.currentFarmer);
    }

    if (nextProps.searchBarShown !== this.props.searchBarShown) {
      this.setSearchBar(nextProps.searchBarShown, nextProps.searchPlaceholder);
    }
  }

  /** Render the navigator */
  public render () {
    return (
      <StyleProvider style={getTheme(material as any)}>
        <Drawer>
          <Container>
            {this.props.headerShown && <Header />}
            <Navigator navigation={this.navHelpers()} />
          </Container>
        </Drawer>
      </StyleProvider>
    );
  }
}

/****************************** Redux ******************************/

const mapStateToProps: MapStateToProps<StorePropsType, {}, State> = (state, ownProps) => {
  // Get current route name
  const currentRouteName = state.nav.routes[state.nav.index].routeName;
  // Get current route information (should never be undefined)
  const currentRouteInfo = routesInfo.find(r => r.route === currentRouteName);

  return {
    nav: state.nav,
    headerShown: state.header.shown,
    routeType: currentRouteInfo && currentRouteInfo.type,
    routeName: currentRouteName,
    searchBarShown: !!currentRouteInfo && !!currentRouteInfo.searchInfo,
    searchPlaceholder: currentRouteInfo && currentRouteInfo.searchInfo && currentRouteInfo.searchInfo.placeholder,
    currentFarmer: getActiveFarmer(state),
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchPropsType, {}> = (dispatch) => {
  return {
    hideHeader: () => dispatch(headerActions.setHeaderShown(false)),
    showHeader: () => dispatch(headerActions.setHeaderShown(true)),
    lockDrawer: () => dispatch(drawerActions.setDrawerLocked(true)),
    unlockDrawer: () => dispatch(drawerActions.setDrawerLocked(false)),
    goBack: () => dispatch(navActions.goBack()),
    showSearch: (placeholder?: string) => dispatch(searchBarActions.showSearchBar(placeholder)),
    hideSearch: () => dispatch(searchBarActions.removeSearchBar()),
    updateHeaderTitle: (title: string) => dispatch(headerActions.setTitle(title)),
  };
};

// Tie navigation into redux store
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppNavigation);
