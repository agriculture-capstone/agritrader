import * as React from 'react';
import { Drawer as BaseDrawer } from 'native-base';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';

import { State } from '../../../store/types';
import appActions from '../../../store/modules/app/actions';
import DrawerContents from './DrawerContents';

/** Drawer OwnProps */
export interface OwnProps {}

interface OwnState {}

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
class Drawer extends React.Component<Props, OwnState> {

  /************************* Member Variables ************************/

  private PAN_OPEN_MASK = .80;

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
        panOpenMask={this.PAN_OPEN_MASK}
        disabled={this.props.locked}
        captureGestures
        acceptPan
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
