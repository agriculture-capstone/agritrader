///<reference path="../../../../node_modules/@types/react-redux/index.d.ts"/>
import * as React from 'react';

import { Content, List, ListItem } from 'native-base';
import { Text, View } from 'react-native';
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';

import createSearchPage, { InjectedSearchProps } from '../../generators/SearchPage';
import navActions from '../../../store/modules/nav/actions';
import { Route } from '../../navigation/navigator';
import { State } from '../../../store/types';
import style from './style';
import * as Fuse from 'fuse.js';
import { FuseOptions } from 'fuse.js';

/** This is just a table of phony information to populate the FarmerSearch UI */
const farmerList: Farmer[] = [
  {
    name: 'Swalleh',
    phoneNumber: '1-250-234-1234',
    id: 1,
  },
  {
    name: 'James',
    phoneNumber: '1-526-123-8123',
    id: 2,
  },
  {
    name: 'Alex',
    phoneNumber: '1-514-235-6789',
    id: 3,
  },
  {
    name: 'Joseph',
    phoneNumber: '1-922-789-2348',
    id: 4,
  },
  {
    name: 'Mary',
    phoneNumber: '1-626-626-1236',
    id: 5,
  },
  {
    name: 'David',
    phoneNumber: '1-789-231-2345',
    id: 6,
  },
  {
    name: 'Michael',
    phoneNumber: '1-899-781-8786',
    id: 7,
  },
  {
    name: 'Mary',
    phoneNumber: '1-897-768-6780',
    id: 8,
  },
  {
    name: 'Peter',
    phoneNumber: '1-123-564-2315',
    id: 9,
  },
  {
    name: 'Jonah',
    phoneNumber: '1-011-101-1001',
    id: 10,
  },
  {
    name: 'Simon',
    phoneNumber: '1-234-456-7890',
    id: 11,
  },
];

/** Basic model for the Farmer object */
// TODO: Move to store --@jinglis
// TODO: should match Core API for farmer @nick
// TODO: Phones should be shown (123) 456-7890 @nick
interface Farmer {
  name: string;
  phoneNumber: string;
  id: number;
}

/** FarmerSearch OwnPropsType */
// TODO: Make required property when moving to StorePropsType
export interface OwnPropsType {

}

/** FarmerSearch StorePropsType */
interface StorePropsType { }

/** FarmerSearch DispatchPropsType */
interface DispatchPropsType {
  navigateToFarmer(): void;
}

/** FarmerSearch OwnStateType */
interface OwnStateType { }

/** FarmerSearch WrappedPropsType */
type WrappedPropsType = StorePropsType & DispatchPropsType & OwnPropsType;

/** FarmerSearch PropsType */
type PropsType = WrappedPropsType & InjectedSearchProps;

/** FarmerSearch StateType */
type StateType = OwnStateType;

/** Farmer Search component for displaying and searching through farmers */
class FarmerSearch extends React.Component<PropsType, StateType> {

  /************************* Member Variables ************************/

  private fuse: Fuse;

  /************************* Member Functions ************************/

  public constructor(props: PropsType) {
    super(props);

    // Initialization
    // TODO: Uncomment this when using props for farmerList. Ask me about this if you need help James
    // this.createFuse(props.farmerList);

    // TODO: Delete this when you remove the global `farmerList` object
    this.createFuse(farmerList);

    // Bindings
    this.renderItem = this.renderItem.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
  }

  /** Click listener for list item */
  private onItemClick() {
    this.props.navigateToFarmer();
  }

  private createFuse(farmerList: Farmer[]) {
    this.fuse = new Fuse(farmerList, {
      caseSensitive: false,
      shouldSort: true,
      threshold: 0.0,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        'name',
      ],
    });
  }

    /** Function to sort the list data by Farmer name in alphabetical order */
    // TODO: Make required property
    private sortList(farmers: Farmer[]): Farmer[] {

        var sortedList: Farmer[] = [];
        if (farmers === undefined) {
            return sortedList;
        }
        sortedList = farmers.sort((f1: Farmer, f2: Farmer) => {
            if (f1.name > f2.name) {
                return 1;
            }
            if (f1.name < f2.name) {
                return -1;
            }
            return 0;
        });
        return sortedList;
    }

  private searchList(): Farmer[] {
    return (this.props.searchBarValue) ?
      this.fuse.search(this.props.searchBarValue) as Farmer[] :
      farmerList;
  }


  /************************* React *************************/

  public componentWillReceiveProps(nextProps: PropsType) {
    // TODO: Uncomment when connecting to store for optimization @James
    // Again ask if you have any questions
    // if ((nextProps.farmerList.length !== this.props.farmerList.length)
    //   || (nextProps.farmerList.every((val, i) => val === this.props.farmerList[i]))
    // ) {
    //   this.createFuse(nextProps.farmerList)
    // }
  }

  // TODO: @nick, render should ideally always be at the bottom of the function
  // Don't worry it takes some getting used to, I still forget all the time
  public render(): JSX.Element {
    return (
      <Content style={style.background} >
        <List
          dataArray={this.sortList(this.searchList())}
          renderRow={this.renderItem}
        />
      </Content>
    );
  }

  // TODO: This is not a React lifecycle method and should be a member function
  /** Function to render the individual list items */
  private renderItem(info: Farmer) {
    return (
      <ListItem
        key={info.id}
        onPress={this.onItemClick}
      >
        <View>
          <Text style={style.name}>
            {info.name}
          </Text>
          <Text style={style.phone}>
            Phone: {info.phoneNumber}
          </Text>
        </View>
      </ListItem>
    );
  }
}

const FarmerSearchPage = createSearchPage<WrappedPropsType>(FarmerSearch, 'Search Farmers');

/************************* Redux ************************/

const mapStateToProps: MapStateToProps<StorePropsType, OwnPropsType, State> = (state) => {
  return {};
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
