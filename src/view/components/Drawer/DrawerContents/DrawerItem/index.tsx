import * as React from 'react';
import { ListItem, Icon, Text, Left, Body } from 'native-base';

/** DrawerItem props */
export interface OwnProps {
  text: string;
  icon: string;
}

/** Navigational item in the drawer */
const DrawerItem: React.StatelessComponent<OwnProps> = (props) => {
  return (
    <ListItem>
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
