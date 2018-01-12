import * as React from 'react';
import { Drawer as BaseDrawer } from 'native-base';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';

import { State } from '../../../store/types';
import appActions from '../../../store/modules/app/actions';

export interface OwnProps {}
export interface OwnState {}

interface StoreProps {
  open: boolean;
}

interface DispatchProps {
  closeDrawer(): void;
}

export type Props = OwnProps & StoreProps & DispatchProps;

class Drawer extends React.Component<Props, OwnState> {
  private drawer: BaseDrawer;

  /****************************** React ******************************/

  public render(): JSX.Element {
    return (
      <BaseDrawer
        open={this.props.open}
        onClose={this.props.closeDrawer}
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
      closeDrawer: () => dispatch(appActions.setDrawerShown(false)),
    };
  }
}

const DrawerContainer = connect(
  Drawer.mapStateToProps,
  Drawer.mapDispatchToProps,
)(Drawer);

export default DrawerContainer;
