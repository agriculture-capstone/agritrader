import * as React from 'react';
import { Content, List, Button, Text } from 'native-base';

import { routesInfo, RouteInfo, Route, DrawerRouteInfo } from '../../../navigation/navigator';
import style from './style';
import DrawerItem from '../DrawerItem';
import DrawerHeader from '../DrawerHeader';

/** DrawerContents props */
export interface OwnPropsType {
  name: string;
  username: string;
  onPress: OnPress;
  onLogout(): void;
}

type OnPress = (route: Route) => void;

/**
 * React component to generate contents inside the drawer
 */
const DrawerContents: React.StatelessComponent<OwnPropsType> = (props) => {
  return (
    <Content style={style.content} >
      <DrawerHeader name={props.name} username={props.username} />
      <List>
        {getDrawerItems(props, routesInfo)}
      </List>
      <Button primary full onPress={props.onLogout}>
        <Text> Sign Out </Text>
      </Button>
    </Content>
  );
};

function getDrawerItems(props: OwnPropsType, routesInfo: RouteInfo[]): JSX.Element[] {
  return routesInfo
    .filter(isDrawerItem)
    .map(routeInfo => createDrawerItem(routeInfo, props.onPress));
}

function createDrawerItem(routeInfo: DrawerRouteInfo, onPress: OnPress) {
  return (
    <DrawerItem
      icon={routeInfo.drawerInfo.icon}
      key={routeInfo.route}
      name={routeInfo.name}
      route={routeInfo.route}
      onPress={onPress}
    />
  );
}

/** Typeguard for routeInfo */
function isDrawerItem(routeInfo: RouteInfo): routeInfo is DrawerRouteInfo {
  return !!routeInfo.drawerInfo;
}

export default DrawerContents;
