import * as React from 'react';
import { Drawer as BaseDrawer } from 'native-base';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';

import { State } from '../../../store/types';

export interface OwnProps {}
export interface OwnState {}

interface StoreProps {
  open: boolean;
}

interface DispatchProps {}

export type Props = OwnProps & StoreProps & DispatchProps;

class Drawer extends React.Component<Props, OwnState> {
  private drawer: BaseDrawer;

  /****************************** React ******************************/

  public render(): JSX.Element {
    return (
      <BaseDrawer
        open={this.props.open}
      >
        {this.props.children}
      </BaseDrawer>
    );
  }

  /****************************** Redux ******************************/

  public static mapStateToProps: MapStateToProps<StoreProps, OwnProps, State> = (state, ownProps) => {
    return {
      open: state.app.drawerShown,
    };
  }

  public static mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch) => {
    return {

    };
  }
}

const DrawerContainer = connect(
  Drawer.mapStateToProps,
  Drawer.mapDispatchToProps,
)(Drawer);

export default DrawerContainer;
