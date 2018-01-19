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
  Input,
  Item,
  View,
} from 'native-base';

import { State } from '../../../store/types';
import appActions from '../../../store/modules/app/actions';

interface OwnProps {}
interface OwnState {}

interface StoreProps {
  drawerLocked: boolean;
  title: string;
  searchBarShown: boolean;
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
        {this.leftIcon()}
      </Button>
    );
  }

  private menuButton() {
    return (
      <Button onPress={this.onMenuClick} transparent>
        {this.leftIcon()}
      </Button>
    );
  }

  private leftIcon(listener?: () => void) {
    return <Icon name={this.props.drawerLocked ? 'arrow-back' : 'menu'} onPress={listener} />;
  }

  private onMenuClick() {
    this.props.openDrawer();
  }

  private createSearchBar() {
    return (
      <Item>
        {this.leftIcon(this.props.drawerLocked ? undefined : this.onMenuClick)}
        <Input placeholder="Search" />
        <Icon name="search" />
      </Item>
    );
  }

  private createTitle() {
    return (
      <View>
        <Left>
          {this.leftButton()}
        </Left>
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
      </View>
    );
  }

  /****************************** React ******************************/

  /** React render method */
  public render() {
    return (
      <BaseHeader searchBar={this.props.searchBarShown} rounded={this.props.searchBarShown}>
        {(this.props.searchBarShown) ? this.createSearchBar() : this.createTitle()}
      </BaseHeader>
    );
  }
}

/****************************** Redux ******************************/

const mapStateToProps: MapStateToProps<StoreProps, OwnProps, State> = (state, ownProps) => {
  return {
    drawerLocked: state.app.drawerLocked,
    title: state.app.title,
    searchBarShown: state.searchBar.shown,
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
