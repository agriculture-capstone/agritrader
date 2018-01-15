import * as React from 'React';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';


// interface ListItemContent<T> {
//   mainTitle: string;
//   secondTitle: string;
//   id: number;
// }


interface OwnProps<T>{
  listData: T[];
  displayRowFunc: (item: T) => JSX.Element;
}

interface OwnState {
}

type Props<T> = OwnProps<T>;

export class MutableList<T> extends React.Component<Props<T>, OwnState> {
  
  public constructor (props: Props<T>) {
    super(props);
    
    // Bindings
    // this.displayRow = this.displayRow.bind(this);
  }
  
  /**
   * Function that will display the contents of each row in the dataArray
   *
   * @param {ListItemContent} listContent The data array
   * @returns {JSX.Element} The element in the row
   */
  // public displayRow(listContent: ListItemContent<T>): JSX.Element {
  //   return (
  //     <ListItem key={listContent.id}>
  //       <Text style={{ fontWeight: 'bold', fontSize: 10 }}>
  //         {listContent.mainTitle + '\n'}
  //       </Text>
  //       <Text style={{ fontSize: 10 }}>
  //         {'Tel: ' + listContent.secondTitle}
  //       </Text>
  //     </ListItem>
  //   );
  // }
  
  public render() {
    return (
        <Container>
            <Content>
                <List
                  dataArray={this.props.listData}
                  renderRow={this.props.displayRowFunc}
                />
            </Content>
        </Container>
    );
  }
}
