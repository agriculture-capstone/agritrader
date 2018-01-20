import * as React from 'react';

import { Content, List, ListItem } from 'native-base';
import { ScrollView, Text } from 'react-native';
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';

import createSearchPage, { InjectedSearchProps } from '../../generators/SearchPage';
import navActions from '../../../store/modules/nav/actions';
import { Route } from '../../navigation/navigator';
import createPage from '../../generators/Page/index';
import { State } from '../../../store/types';

/**
 * This is the basic model for the type of farmer object that
 * should be put into array form and given to this page component
 */
interface farmerList {
  name: string;
  phoneNumber: string;
  id: number;
}

/**
 * An array of farmer objects must be supplied to populate the list
 */
export interface OwnProps {
  listItems?: farmerList[];
}

interface StoreProps {}

interface DispatchProps {
  navigateToFarmer(): void;
}

type FarmerSearchProps = StoreProps & DispatchProps & OwnProps;
type Props = FarmerSearchProps & InjectedSearchProps;

const farmerList = [{ name: 'Swalleh', phoneNumber: '1-250-234-1234', id: 1 },
                    { name: 'James', phoneNumber: '1-526-123-8123', id: 2 },
                    { name: 'Alex', phoneNumber: '1-514-235-6789', id: 3 },
                    { name: 'James I.', phoneNumber: '1-922-789-2348', id: 2 },
                    { name: 'Bea', phoneNumber: '1-626-626-1236', id: 2 },
                    { name: 'Brad', phoneNumber: '1-789-231-2345', id: 2 },
                    { name: 'Enoch', phoneNumber: '1-899-781-8786', id: 2 },
                    { name: 'Moath', phoneNumber: '1-897-768-6780', id: 2 },
                    { name: 'Nick', phoneNumber: '1-123-564-2315', id: 2 },
                    { name: 'Farmer 239-XB4', phoneNumber: '1-011-101-1001', id: 2 }];


class FarmerSearch extends React.Component<Props, {}> {

  public static defaultProps = {
    listItems: farmerList,
  };

  /************************* Member Variables ************************/

  /************************* Member Functions ************************/

  public constructor (props: Props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
    this.itemClicked = this.itemClicked.bind(this);
  }

  private itemClicked() {
    this.props.navigateToFarmer();
  }

  /************************* React Lifecycle *************************/
  public render (): JSX.Element {
    return (
      <Content>

          <List
            dataArray={this.props.listItems}
            renderRow={this.renderItem}
          />

      </Content>
    );
  }

  private renderItem(info: farmerList) {
    return (
      <ListItem key={info.id} onPress={this.itemClicked} >
        <Text>{info.name}</Text>
        <Text>Phone: {info.phoneNumber}</Text>
      </ListItem>
    );
  }
}

const FarmerSearchPage = createSearchPage<FarmerSearchProps>(FarmerSearch, 'Search Farmers');

/************************* Redux ************************/

const mapStateToProps: MapStateToProps<StoreProps, OwnProps, State> = (state) => {
  return {};
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch) => {
  return {
    navigateToFarmer: () => dispatch(navActions.navigateTo(Route.FARMER)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FarmerSearchPage);
