import * as React from 'react';
import { Drawer as BaseDrawer } from 'native-base';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';

import { State } from '../../../store/types';
import drawerActions from '../../../store/modules/drawer/actions';
import navActions from '../../../store/modules/nav/actions';
import headerActions from '../../../store/modules/header/actions';
import rootThunks from '../../../store/thunks';
import DrawerContents from './DrawerContents';
import { Route } from '../../navigation/routes';

/** Drawer OwnPropsType */
export interface OwnPropsType {}

/** Drawer State */
export interface OwnState {}

interface StorePropsType {
  open: boolean;
  locked: boolean;
}

interface DispatchPropsType {
  closeDrawer(): void;
  openDrawer(): void;
  navigate(route: Route): void;
  showHeader(): void;
  logout(): Promise<void>;
}

/** Drawer props */
type PropsType = OwnPropsType & StorePropsType & DispatchPropsType;

/** Drawer component for navigation */
class Drawer extends React.Component<PropsType, OwnState> {

  /************************* Member Variables ************************/

  private PAN_OPEN_MASK = .10;

  /************************* Member Functions ************************/

  public constructor(props: PropsType) {
    super(props);

    this.onPress = this.onPress.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
  }

  private openDrawer() {
    if (!this.props.locked) {
      this.props.openDrawer();
    }
  }

  private onPress(route: Route) {
    this.props.navigate(route);
    this.props.showHeader();
    this.props.closeDrawer();
  }

  private async onLogout() {
    await this.props.logout();
  }

  private createDrawerContents() {
    return (
      <DrawerContents
        name={'Quality Milk'}
        username={''}
        onPress={this.onPress}
        onLogout={this.onLogout}
      />
    );
  }

  /****************************** React ******************************/

  /** React render method */
  public render(): JSX.Element {
    return (
      <BaseDrawer
        content={this.createDrawerContents()}
        open={this.props.open}
        onClose={this.props.closeDrawer}
        onOpen={this.openDrawer}
        type="overlay"
        panOpenMask={this.PAN_OPEN_MASK}
        disabled={this.props.locked}
        acceptPan
      >
      {this.props.children}
      </BaseDrawer>
    );
  }
}

/****************************** Redux ******************************/

const mapStateToProps: MapStateToProps<StorePropsType, OwnPropsType, State> = (state, ownProps) => {
  return {
    open: state.drawer.drawerShown,
    locked: state.drawer.drawerLocked,
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchPropsType, OwnPropsType> = (dispatch) => {
  return {
    closeDrawer: () => dispatch(drawerActions.setDrawerShown(false)),
    openDrawer: () => dispatch(drawerActions.setDrawerShown(true)),
    navigate: (route: Route) => dispatch(navActions.navigateToDrawerRoute(route)),
    showHeader: () => dispatch(headerActions.setHeaderShown(true)),
    logout: async () => dispatch(rootThunks.logout()),
  };
};

const DrawerContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Drawer);


export default DrawerContainer;
