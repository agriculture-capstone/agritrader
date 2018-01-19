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
import searchBarActions from '../../../store/modules/searchBar/actions';

interface OwnProps {}
interface OwnState {}

interface StoreProps {
  drawerLocked: boolean;
  title: string;
  searchBarShown: boolean;
  searchPlaceholder: string;
}

interface DispatchProps {
  openDrawer(): void;
  goBack(): void;
  onSearchChange(value: string): void;
}

/** Header props */
type Props = OwnProps & StoreProps & DispatchProps;

interface LeftButtonInfo {
  icon: 'arrow-back' | 'menu';
  listener(): void;
}

/** Header component */
class Header extends React.Component<Props, OwnState> {

  public constructor(props: Props) {
    super(props);

    // Bindings
    this.onMenuClick = this.onMenuClick.bind(this);
    this.onBackClick = this.onBackClick.bind(this);
  }

  private onMenuClick() {
    this.props.openDrawer();
  }

  private onBackClick() {
    return;
  }

  private leftButtonInfo(): LeftButtonInfo {
    return this.props.drawerLocked ? {
      icon: 'arrow-back',
      listener: this.onBackClick,
    } : {
      icon: 'menu',
      listener: this.onMenuClick,
    };
  }

  private leftToolbarButton() {
    const { icon, listener } = this.leftButtonInfo();
    return (
      <Button onPress={listener} transparent>
        <Icon name={icon} />
      </Button>
    );
  }

  private leftSearchIcon() {
    const { icon, listener } = this.leftButtonInfo();
    return <Icon name={icon} onPress={listener} />;
  }

  private createSearchBar() {
    return (
      <Item>
        {this.leftSearchIcon()}
        <Input placeholder={this.props.searchPlaceholder} onChangeText={this.props.onSearchChange} />
        <Icon name="search" />
      </Item>
    );
  }

  private createTitle() {
    return (
      <View>
        <Left>
          {this.leftToolbarButton()}
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
    searchPlaceholder: state.searchBar.placeholder,
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch) => {
  return {
    openDrawer: () => dispatch(appActions.setDrawerShown(true)),
    goBack: () => dispatch(NavigationActions.back()),
    onSearchChange: (value: string) => dispatch(searchBarActions.setSearchBarValue(value)),
  };
};

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

export default HeaderContainer;
