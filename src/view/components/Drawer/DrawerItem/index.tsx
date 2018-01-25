import * as React from 'react';
import { ListItem, Icon, Text, Left, Body } from 'native-base';

import { Route } from '../../../navigation/navigator';
import styles from './style';

/** DrawerItem props */
export interface OwnProps {
  name: string;
  icon: string;
  route: Route;
  onPress(route: Route): void;
}

type onPress = (() => void);

const onPresses = {} as {
  [key: string]: onPress;
};

/** Navigational item in the drawer */
const DrawerItem: React.StatelessComponent<OwnProps> = (props) => {
  // If handler does not exist, create it
  onPresses[props.route] || (onPresses[props.route] = (() => props.onPress(props.route)));

  return (
    <ListItem icon onPress={onPresses[props.route]} style={styles.contents}>
      <Left>
        <Icon name={props.icon} style={styles.contents} />
      </Left>
      <Body>
        <Text style={styles.contents}>{props.name}</Text>
      </Body>
    </ListItem>
  );
};

export default DrawerItem;
