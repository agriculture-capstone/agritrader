import * as React from 'react';

import { Content, List, ListItem } from 'native-base';
import { ScrollView, Text } from 'react-native';

import createSearchPage, { InjectedSearchProps } from '../../lib/generators/SearchPage';

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

/**
 * The internal state of the list
 */
interface State {}

type Props = OwnProps & InjectedSearchProps;

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


class FarmerSearch extends React.Component<Props, State> {

  public static defaultProps = {
    listItems: farmerList,
  };

  /************************* Member Variables ************************/

  /************************* Member Functions ************************/

  public constructor (props: Props) {
    super(props);
  }

  /************************* React Lifecycle *************************/
  public render (): JSX.Element {
    return (
      <Content>
        <ScrollView
          scrollEnabled={true}
          alwaysBounceVertical={true}
        >
          <List
            dataArray={this.props.listItems}
            renderRow={this.renderItem}
          />
        </ScrollView>
      </Content>
    );
  }

  private renderItem(info: farmerList) {
    return (
      <ListItem key={info.id}>
        <Text>{info.name}</Text>
        <Text>Phone: {info.phoneNumber}</Text>
      </ListItem>
    );
  }

  /************************* Static Functions ************************/
}

export default createSearchPage<OwnProps>(FarmerSearch, 'back', 'Search Farmers');
