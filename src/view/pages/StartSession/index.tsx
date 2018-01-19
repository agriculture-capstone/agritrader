import * as React from 'react';

import { Container, Header, Content, List, ListItem } from 'native-base';
import { ScrollView, Text } from 'react-native';

interface farmerList {
  name: string;
  phoneNumber: string;
  id: number;
}

export interface Props {
  listItems: farmerList[];
}

export interface State {}


export class StartSession extends React.Component<Props, State> {
  
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
  
  public renderItem(info: farmerList) {
    return (
      <ListItem key={info.id}>
        <Text>{info.name}</Text>
      </ListItem>
    );
  }
  
  /************************* Static Functions ************************/
}
