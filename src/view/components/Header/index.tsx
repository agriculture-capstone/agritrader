import * as React from 'react';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import {
  Header as BaseHeader,
  Left,
  Button,
  Icon,
  Body,
  Title,
} from 'native-base';

import { State } from '../../../store/types';
import appActions from '../../../store/modules/app/actions';

interface OwnProps {}
interface OwnState {}

interface StoreProps {
  drawerLocked: boolean;
  title: string;
}

interface DispatchProps {
  openDrawer(): void;
}

export type Props = OwnProps & StoreProps & DispatchProps;

class Header extends React.Component<Props, OwnState> {

  public constructor(props: Props) {
    super(props);

    // Bindings
    this.onBackClick = this.onBackClick.bind(this);
    this.onMenuClick = this.onMenuClick.bind(this);
  }

  private leftButton() {
    return this.props.drawerLocked ? this.backButton() : this.menuButton();
  }

  private backButton() {
    return (
      <Button onPress={this.onBackClick}>
        <Icon name="arrow-back" />
      </Button>
    );
  }

  private menuButton() {
    return (
      <Button onPress={this.onMenuClick}>
        <Icon name="menu" />
      </Button>
    );
  }

  private onBackClick() {

  }

  private onMenuClick() {
    this.props.openDrawer();
  }

  /****************************** React ******************************/

  public render() {
    return (
      <BaseHeader>
        <Left>
          {this.leftButton()}
        </Left>
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
      </BaseHeader>
    );
  }

  /****************************** Redux ******************************/

  public static mapStateToProps: MapStateToProps<StoreProps, OwnProps, State> = (state, ownProps) => {
    return {
      drawerLocked: state.app.drawerLocked,
      title: state.app.title,
    };
  }

  public static mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch) => {
    return {
      openDrawer: () => dispatch(appActions.setDrawerShown(true)),
    };
  }
}

const HeaderContainer = connect(
  Header.mapStateToProps,
  Header.mapDispatchToProps,
)(Header);

export default HeaderContainer;
