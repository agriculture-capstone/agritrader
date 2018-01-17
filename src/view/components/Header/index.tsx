import * as React from 'react';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import { NavigationActions } from 'react-navigation';
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
  tabbedHeader: boolean;
}

interface DispatchProps {
  openDrawer(): void;
  goBack(): void;
}

/** Header props */
type Props = OwnProps & StoreProps & DispatchProps;

/** Header component */
class Header extends React.Component<Props, OwnState> {

  public constructor(props: Props) {
    super(props);

    // Bindings
    this.onMenuClick = this.onMenuClick.bind(this);
  }

  private leftButton() {
    return this.props.drawerLocked ? this.backButton() : this.menuButton();
  }

  private backButton() {
    return (
      <Button onPress={this.props.goBack} transparent>
        <Icon name="arrow-back" />
      </Button>
    );
  }

  private menuButton() {
    return (
      <Button onPress={this.onMenuClick} transparent>
        <Icon name="menu" />
      </Button>
    );
  }

  private onMenuClick() {
    this.props.openDrawer();
  }

  /****************************** React ******************************/

  /** React render method */
  public render() {
    return (
      <BaseHeader hasTabs={!!this.props.tabbedHeader}>
        <Left>
          {this.leftButton()}
        </Left>
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
      </BaseHeader>
    );
  }
}

/****************************** Redux ******************************/

const mapStateToProps: MapStateToProps<StoreProps, OwnProps, State> = (state, ownProps) => {
  return {
    drawerLocked: state.app.drawerLocked,
    title: state.app.title,
    tabbedHeader: !!state.tabs.tabs.length,
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch) => {
  return {
    openDrawer: () => dispatch(appActions.setDrawerShown(true)),
    goBack: () => dispatch(NavigationActions.back()),
  };
};

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

export default HeaderContainer;
