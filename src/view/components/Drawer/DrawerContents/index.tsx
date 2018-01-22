import * as React from 'react';
import { Grid, Row } from 'react-native-easy-grid';
import { Content, List, Button, Text, ListItem } from 'native-base';
import { View } from 'react-native';
import { routesInfo, RouteInfo, Route, DrawerRouteInfo } from '../../../navigation/navigator';
import style from './style';
import DrawerItem from '../DrawerItem';
import DrawerHeader from '../DrawerHeader';

/** DrawerContents props */
export interface OwnPropsType {
  name: string;
  username: string;
  onPress(route: Route): void;
  onLogout(): void;
}

/**
 *
 * @param props
 */
const DrawerContents: React.StatelessComponent<OwnPropsType> = (props) => {
  return (
    <Content style={style.content} >
      <DrawerHeader name={props.name} username={props.username} />
      <List>
        {getDrawerItems(props, routesInfo)}
      </List>
      <Button danger full onPress={props.onLogout}>
      <Text> Sign out </Text>
      </Button>
    </Content>
  );
};

function getDrawerItems(props: OwnPropsType, routesInfo: RouteInfo[]): JSX.Element[] {
  return routesInfo
    .filter(isDrawerItem)
    .map(routeInfo => <DrawerItem icon={routeInfo.drawerInfo.icon} key={routeInfo.route} name={routeInfo.name} onPress={props.onPress} />);
}

function isDrawerItem(routeInfo: RouteInfo): routeInfo is DrawerRouteInfo {
  return !!routeInfo.drawerInfo;
}

export default DrawerContents;
