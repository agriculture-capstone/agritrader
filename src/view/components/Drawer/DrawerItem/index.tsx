import * as React from 'react';
import { ListItem, Icon, Text, Left, Body } from 'native-base';
import { Row } from 'react-native-easy-grid';

import { Route } from '../../../navigation/navigator';

/** DrawerItem props */
export interface OwnProps {
  name: Route;
  icon: string;
  onPress(route: Route): void;
}

type onPress = (() => void);

const onPresses = {} as {
  [key: string]: onPress;
};

/** Navigational item in the drawer */
const DrawerItem: React.StatelessComponent<OwnProps> = (props) => {
  onPresses[props.name] || (onPresses[props.name] = (() => props.onPress(props.name)));
  return (
    <ListItem icon onPress={onPresses[props.name]}>
      <Left>
        <Icon name={props.icon} />
      </Left>
      <Body>
        <Text>{props.name}</Text>
      </Body>
    </ListItem>
  );
};

export default DrawerItem;
