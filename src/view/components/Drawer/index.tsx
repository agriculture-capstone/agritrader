import * as React from 'react';
import { Drawer as BaseDrawer } from 'native-base';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';

import { State } from '../../../store/types';
import createAppActions from '../../../store/modules/app/actions';
import DrawerContents from './DrawerContents';

/** Drawer OwnProps */
export interface OwnProps {}

/** Drawer State */
export interface State {}

interface StoreProps {
  open: boolean;
  locked: boolean;
}

interface DispatchProps {
  closeDrawer(): void;
  openDrawer(): void;
}

/** Drawer props */
type Props = OwnProps & StoreProps & DispatchProps;

/** Drawer component for navigation */
class Drawer extends React.Component<Props, State> {

  /************************* Member Variables ************************/

  /************************* Member Functions ************************/

  /****************************** React ******************************/

  /** React render method */
  public render(): JSX.Element {
    return (
      <BaseDrawer
        open={this.props.open}
        onClose={this.props.closeDrawer}
        onOpen={this.props.openDrawer}
        content={<DrawerContents />}
        type="overlay"
        disabled={this.props.locked}
        acceptPan
        captureGestures
      >
      {this.props.children}
      </BaseDrawer>
    );
  }
}

/****************************** Redux ******************************/

const mapStateToProps: MapStateToProps<StoreProps, OwnProps, State> = (state, ownProps) => {
  return {
    open: state.app.drawerShown,
    locked: state.app.drawerLocked,
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch) => {
  const appActions = createAppActions();

  return {
    closeDrawer: () => dispatch(appActions.setDrawerShown(false)),
    openDrawer: () => dispatch(appActions.setDrawerShown(true)),
  };
};

const DrawerContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Drawer);


export default DrawerContainer;
