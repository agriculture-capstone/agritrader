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

/** This is just a table of phony information to populate the FarmerSearch UI */
const fakeFarmerList = [
  {
    name: 'Swalleh',
    phoneNumber: '(250) 234-1234',
    id: 1,
  },
  {
    name: 'James',
    phoneNumber: '(526) 123-8123',
    id: 2,
  },
  {
    name: 'Alex',
    phoneNumber: '(514) 235-6789',
    id: 3,
  },
  {
    name: 'Joseph',
    phoneNumber: '(922) 789-2348',
    id: 4,
  },
  {
    name: 'Mary',
    phoneNumber: '(626) 626-1236',
    id: 5,
  },
  {
    name: 'David',
    phoneNumber: '(789) 231-2345',
    id: 6,
  },
  {
    name: 'Michael',
    phoneNumber: '(899) 781-8786',
    id: 7,
  },
  {
    name: 'Mary',
    phoneNumber: '(897) 768-6780',
    id: 8,
  },
  {
    name: 'Peter',
    phoneNumber: '(123) 564-2315',
    id: 9,
  },
  {
    name: 'Jonah',
    phoneNumber: '(011) 101-1001',
    id: 10,
  },
  {
    name: 'Simon',
    phoneNumber: '(234) 456-7890',
    id: 11,
  },
];

/** Basic model for the FarmerType object */
// TODO: Move to store --@jinglis
interface FarmerType {
  name: string;
  phoneNumber: string;
  id: number;
}

/** FarmerSearch OwnPropsType */
// TODO: Make required property when moving to StorePropsType
export interface OwnPropsType {
}

/** FarmerSearch StorePropsType */
interface StorePropsType {
  // farmerList: Farmer[];
}

/** FarmerSearch DispatchPropsType */
interface DispatchPropsType {
  navigateToFarmer(): void;
}

/** FarmerSearch OwnStateType */
interface OwnStateType {}

type WrappedPropsType = StorePropsType & DispatchPropsType & OwnPropsType;

/** FarmerSearch PropsType */
type PropsType = InjectedSearchProps & InjectedFabProps & WrappedPropsType;

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
  // TODO: Make required property
  private sortList(farmers?: FarmerType[]): FarmerType[] {

    let sortedList: FarmerType[] = [];
    if (farmers === undefined) {
      return sortedList;
    }
    sortedList = farmers.sort((f1: FarmerType, f2: FarmerType) => {
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

  private onFabPress() {

  }

  /** Function to render the individual list items */
  private renderItem(info: FarmerType) {
    return (
      <ListItem key={info.id} onPress={this.itemClicked}>
        <View>
          <H1>
            {info.name}
          </H1>
          <H3>
            {info.phoneNumber}
          </H3>
        </View>
      </ListItem>
    );
  }

  /************************* React *************************/

  public componentDidMount() {
    this.props.listenToFab(this.onFabPress);
  }

  /** Render method to create the List */
  public render(): JSX.Element {
    return (
      <Content>
        <List
          dataArray={this.sortList(fakeFarmerList)}
          renderRow={this.renderItem}
        />
      </Content>
    );
  }
}

const FarmerSearchPage = new Composer<WrappedPropsType>(FarmerSearch)
  .search('Search Farmers')
  .fab()
  .finalize;


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
