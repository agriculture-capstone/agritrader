import * as React from 'react';

import { H1, H3, Content, List, ListItem } from 'native-base';
import { View } from 'react-native';
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';

import Composer from '../../hoc/PageComposer';
import navActions from '../../../store/modules/nav/actions';
import { Route } from '../../navigation/navigator';
import { State } from '../../../store/types';
import { InjectedSearchProps } from '../../hoc/PageComposer/SearchPage/index';
import { InjectedFabProps } from '../../hoc/PageComposer/FabPage/index';
import { StoreFarmer } from '../../../store/modules/farmer/types';

/** FarmerSearch OwnPropsType */
// TODO: Make required property when moving to StorePropsType
export interface OwnPropsType {
}

/** FarmerSearch StorePropsType */
interface StorePropsType {
  farmers: StoreFarmer[];
}

/** FarmerSearch DispatchPropsType */
interface DispatchPropsType {
  navigateToFarmer(): void;
}

/** FarmerSearch OwnStateType */
interface OwnStateType {}

type NestedPropsType = StorePropsType & DispatchPropsType & OwnPropsType;

/** FarmerSearch PropsType */
type PropsType = InjectedSearchProps & InjectedFabProps & NestedPropsType;

/** Farmer Search component for displaying and searching through farmers */
class FarmerSearch extends React.Component<PropsType, OwnStateType> {

  /************************* Member Variables ************************/

  /************************* Member Functions ************************/

  public constructor(props: PropsType) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
    this.itemClicked = this.itemClicked.bind(this);
    this.onFabPress = this.onFabPress.bind(this);
  }

  /** Function to take user to farmer that was clicked on */
  private itemClicked() {
    this.props.navigateToFarmer();
  }

  /** Function to sort the list data by Farmer name in alphabetical order */
  private sortList(farmers: StoreFarmer[]): StoreFarmer[] {
    // Declare block scoped var (let) at top
    let sortedList: StoreFarmer[] = [];
    sortedList = farmers.sort((f1, f2) => {
      if (f1.firstName.toLowerCase() > f2.firstName.toLowerCase()) {
        return 1;
      }
      if (f1.firstName < f2.firstName) {
        return -1;
      }
      return 0;
    });
    return sortedList;
  }

  private onFabPress() {
  }

  /** Function to render the individual list items */
  private renderItem(farmer: StoreFarmer) {
    return (
      <ListItem key={farmer.uuid} onPress={this.itemClicked}>
        <View>
          <H1>
            {`${farmer.firstName} ${farmer.lastName}`}
          </H1>
          <H3>
            {`+${farmer.phoneCountry} (${farmer.phoneArea}) ${farmer.phoneNumber}`}
          </H3>
        </View>
      </ListItem>
    );
  }

  /************************* React *************************/

  /** React componentDidMount */
  public componentDidMount() {
    this.props.listenToFab(this.onFabPress);
  }

  /** Render method to create the List */
  public render(): JSX.Element {
    return (
      <Content>
        <List
          dataArray={this.sortList(this.props.farmers)}
          renderRow={this.renderItem}
        />
      </Content>
    );
  }
}

const FarmerSearchPage = new Composer<NestedPropsType>(FarmerSearch)
  .search('Search Farmers')
  .fab()
  .page;


/************************* Redux ************************/

const mapStateToProps: MapStateToProps<StorePropsType, OwnPropsType, State> = (state) => {
  return {
    farmers: state.farmer.rows,
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchPropsType, OwnPropsType> = (dispatch) => {
  return {
    navigateToFarmer: () => dispatch(navActions.navigateTo(Route.FARMER)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FarmerSearchPage);
