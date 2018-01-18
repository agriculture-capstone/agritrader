import * as React from 'react';
import { ListItem, Icon, Text, Left, Body } from 'native-base';
import { Row } from 'react-native-easy-grid';

/** DrawerItem props */
export interface OwnProps {
  text: string;
  icon: string;
}

/** Navigational item in the drawer */
const DrawerItem: React.StatelessComponent<OwnProps> = (props) => {
  return (
    <ListItem icon>
      <Left>
        <Icon name={props.icon} />
      </Left>
      <Body>
        <Text>{props.text}</Text>
      </Body>
    </ListItem>
  );
};

export default DrawerItem;
