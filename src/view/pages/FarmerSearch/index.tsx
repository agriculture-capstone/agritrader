import * as React from 'react';
import { H2, H3, Content, List, ListItem } from 'native-base';
import { View } from 'react-native';
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import * as Fuse from 'fuse.js';
import { createSelector } from 'reselect';

import Composer from '../../hoc/PageComposer';
import navActions from '../../../store/modules/nav/actions';
import { Route } from '../../navigation/navigator';
import { State } from '../../../store/types';
import { InjectedSearchProps } from '../../hoc/PageComposer/SearchPage/index';
import { InjectedFabProps } from '../../hoc/PageComposer/FabPage/index';
import { StoreFarmer } from '../../../store/modules/farmer/types';

/** FarmerSearch OwnPropsType */
export interface OwnPropsType {
}

/** FarmerSearch StorePropsType */
interface StorePropsType {
  farmers: StoreFarmer[];
}

/** FarmerSearch DispatchPropsType */
interface DispatchPropsType {
  navigateToFarmer(uuid: string): void;
  navigateToAddFarmer(): void;
}

/** FarmerSearch OwnStateType */
interface OwnStateType {}

type NestedPropsType = StorePropsType & DispatchPropsType & OwnPropsType;

/** FarmerSearch PropsType */
type PropsType = InjectedSearchProps & InjectedFabProps & NestedPropsType;

/** Farmer Search component for displaying and searching through farmers */
class FarmerSearch extends React.Component<PropsType, OwnStateType> {

  /************************* Member Variables ************************/

  private fuse: Fuse;
  private searchList: (instance: FarmerSearch) => StoreFarmer[];

  /************************* Member Functions ************************/

  public constructor(props: PropsType) {
    super(props);

    this.createFuse(props.farmers);

    // Bindings
    this.renderItem = this.renderItem.bind(this);
    this.createOnItemClicked = this.createOnItemClicked.bind(this);
    this.onFabPress = this.onFabPress.bind(this);

    // Selectors
    const getSearchValue = (instance: FarmerSearch) => instance.props.searchBarValue;
    const getFarmers = (instance: FarmerSearch) => instance.props.farmers;
    const getSortedFarmers = (instance: FarmerSearch) => this.sortList(getFarmers(instance));
    this.searchList = createSelector(
      getSearchValue,
      getSortedFarmers,
      (searchValue, farmers) => searchValue ? this.fuse.search(searchValue) : farmers,
    );
  }

  private createFuse(farmers: StoreFarmer[]) {
    this.fuse = new Fuse(farmers, {
      caseSensitive: false,
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        'name',
        'phoneNumber',
      ],
    });
  }

  private createOnItemClicked(uuid: string) {
    return () => this.props.navigateToFarmer(uuid);
  }

  private onFabPress() {
    this.props.navigateToAddFarmer();
  }

  /** Function to sort the list data by Farmer name in alphabetical order */
  private sortList(farmers: StoreFarmer[]): StoreFarmer[] {
    let sortedList: StoreFarmer[] = [];
    sortedList = farmers.sort((f1, f2) => {
      const n1 = f1.firstName.toLowerCase();
      const n2 = f2.firstName.toLowerCase();

      if (n1 > n2) return 1;

      else if (n1 < n2) return -1;

      else return 0;
    });

    return sortedList;
  }

  /** Function to render the individual list items */
  private renderItem(farmer: StoreFarmer) {
    return (
      <ListItem key={farmer.uuid} onPress={this.createOnItemClicked(farmer.uuid)}>
        <View>
          <H2>
            {`${farmer.firstName} ${farmer.lastName}`}
          </H2>
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
          dataArray={this.searchList(this)}
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
    navigateToFarmer: (uuid: string) => dispatch(navActions.navigateToFarmer(Route.FARMER, uuid)),
    navigateToAddFarmer: () => dispatch(navActions.navigateTo(Route.ADD_FARMER)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FarmerSearchPage);
