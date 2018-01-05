import * as React from 'react';
import { Drawer as BaseDrawer } from 'native-base';
import { connect } from 'react-redux';

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

  public static mapStateToProps: MapStateToProps<StoreProps, OwnProps, State> = () => {

  }

  public static mapDispatchToProps: MapDispatchToProps<> = () => {

  }
}

const DrawerContainer = connect<>(
  Drawer.mapStateToProps,
  Drawer.mapDispatchToProps,
)(Drawer);

