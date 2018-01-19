import * as React from 'react';

import { Content, List, ListItem } from 'native-base';
import { ScrollView, Text } from 'react-native';

import HeaderContainer from '../../components/Header';

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
export interface Props {
  listItems: farmerList[];
}

/**
 * The internal state of the list
 */
interface State {}


export class FarmerList extends React.Component<Props, State> {
  
  /************************* Member Variables ************************/
  
  /************************* Member Functions ************************/
  
  public constructor (props: Props) {
    super(props);
  }
  
  /************************* React Lifecycle *************************/
  public render (): JSX.Element {
    return (
      <Content>
        <HeaderContainer/>
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
        <Content>
          <Text>{info.name}</Text>
          <Text>Phone: {info.phoneNumber}</Text>
        </Content>
      </ListItem>
    );
  }
  
  /************************* Static Functions ************************/
}
