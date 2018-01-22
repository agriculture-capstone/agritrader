import { Container, Toast } from 'native-base';
import { BackHandler } from 'react-native';
import { NavigationState, addNavigationHelpers } from 'react-navigation';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import * as React from 'react';

import Header from '../../view/components/Header';
import Drawer from '../../view/components/Drawer';
import { State } from '../../store/types';
import Navigator, { routes, PageType, Route } from './navigator';
import headerActions from '../../store/modules/header/actions';
import drawerActions from '../../store/modules/drawer/actions';
import searchBarActions from '../../store/modules/searchBar/actions';
import navActions from '../../store/modules/nav/actions';
import store from '../../store';

interface StoreProps {
  nav: NavigationState;
  headerShown: boolean;
  routeType: PageType | undefined;
  searchBarShown: boolean;
  searchPlaceholder: string | undefined;
}

interface DispatchProps {
  lockDrawer(): void;
  unlockDrawer(): void;
  hideHeader(): void;
  showHeader(): void;
  goBack(): void;
  showSearch(placeholder?: string): void;
  hideSearch(): void;
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
        throw new Error('should not be default case');
    }
  }

  private setSearchBar(searchBarShown: boolean, placeholder?: string) {
    searchBarShown ? this.props.showSearch(placeholder) : this.props.hideSearch();
  }

  public componentWillMount() {
    this.setHeaderAndDrawer(this.props.routeType);
    this.setSearchBar(this.props.searchBarShown, this.props.searchPlaceholder);
  }

  public componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  public componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  public componentWillReceiveProps(nextProps: Props) {
    if (nextProps.routeType !== this.props.routeType) {
      const type = nextProps.routeType;
      this.setHeaderAndDrawer(type);
    }

    if (nextProps.searchBarShown !== this.props.searchBarShown) {
      this.setSearchBar(nextProps.searchBarShown, nextProps.searchPlaceholder);
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
    searchBarShown: !!currentRoute && currentRoute.search,
    searchPlaceholder: currentRoute && currentRoute.searchPlaceholder,
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (dispatch) => {
  return {
    hideHeader: () => dispatch(headerActions.setHeaderShown(false)),
    showHeader: () => dispatch(headerActions.setHeaderShown(true)),
    lockDrawer: () => dispatch(drawerActions.setDrawerLocked(true)),
    unlockDrawer: () => dispatch(drawerActions.setDrawerLocked(false)),
    goBack: () => dispatch(navActions.goBack()),
    showSearch: (placeholder?: string) => dispatch(searchBarActions.showSearchBar(placeholder)),
    hideSearch: () => dispatch(searchBarActions.removeSearchBar()),
  };
};

// Tie navigation into redux store
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppNavigation);
