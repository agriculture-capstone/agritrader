import * as React from 'react';

import { MutableList } from '../../components/MutableList';
import SearchBar from '../../components/SearchBar';
import { Container, Header, Content, ListItem } from 'native-base';
import { Text } from 'react-native';

export interface Props {}

export interface State {}

/**
 * Test data to pass in as list
 */

interface FarmerModel {
  name: string;
  phone: string;
  id: number;
  notes: string;
}

const farmerList: FarmerModel[] = [{ name: 'Nick', phone: '1234', id: 1, notes: 'No notes' },
                                   { name: 'Nick2', phone: '1234', id: 2, notes: 'No notes' }];

// const listFarmers = (item: FarmerModel): JSX.Element => {
//   return (
//     <ListItem key={item.id}>
//       <Text style={{ fontWeight: 'bold', fontSize: 10 }}>
//         {item.name + '\n'}
//       </Text>
//       <Text style={{ fontSize: 10, left: -10 }}>
//         {'Tel: ' + item.phone}
//       </Text>
//     </ListItem>
//   );
// };

// interface OwnProps<T>{
//   listData: T[];
//   displayRowFunc: (item: T) => JSX.Element;
// }
//
// const test: OwnProps<FarmerModel> = {
//   displayRowFunc: listFarmers,
//   listData: farmerList,
// }


/**
 * TODO: Documentation
 */
export class StartSession extends React.Component<Props, State> {
  
  /************************* Member Variables ************************/
  
  /************************* Member Functions ************************/

  public constructor (props: Props) {
    super(props);
    
  }
  
  /************************* React Lifecycle *************************/
  
  public render(): JSX.Element {
    return (
      <Container>
        <Header>
          <SearchBar />
        </Header>
        <Content>
          <MutableList
            listData={farmerList}
            displayRowFunc={this.listFarmers}
          />
        </Content>
      </Container>
    );
  }
  
  /************************* Static Functions ************************/
  public listFarmers(farmers: FarmerModel): JSX.Element {
    return (
      <ListItem key={farmers.id}>
        <Text style={{ fontWeight: 'bold', fontSize: 10 }}>
          {farmers.name + '\n'}
        </Text>
        <Text style={{ fontSize: 10 }}>
          {'Tel: ' + farmers.phone}
        </Text>
      </ListItem>
    );
  }
}
