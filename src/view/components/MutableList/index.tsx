import * as React from 'React';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';


// interface ListItemContent<T> {
//   mainTitle: string;
//   secondTitle: string;
//   id: number;
// }

/**
 * Interface to define the generic List Props
 */
interface ListProps<ListItems> {
  listData: ListItems;
  ListComponent: React.ComponentType<ListComponentProps<ListItems>>;
}

interface OwnState<ListItems> {
  items: ListItems;
}

type ListComponentProps<ListItems> = { items: ListItems } & Handlers<ListItems>;

interface Handlers<ListItems> {
  onChange: OnChangeHandler<ListItems>;
}

type OnChangeHandler<ListItems> = <K extends keyof ListItems> (
  s: K,
  a: ListItems[K],
) => void;


type Props<ListItems> = ListProps<ListItems>;

export class MutableList<ListItems> extends React.Component<Props<ListItems>, OwnState<ListItems>>{
  
  public constructor (props: Props<ListItems>) {
    super(props);
    this.state = { items: props.listData };
  }
  
  public onChange: OnChangeHandler<ListItems> = (item, value) => {
    this.setState({ items: merge(this.state.items, { [item]: value }) });
  }
  
  public render() {
    
    const { ListComponent } = this.props;
    const { items } = this.state;
    
    return <ListComponent onChange={this.onChange} items={items} />;
  }
}
