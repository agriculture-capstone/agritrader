import * as React from 'react';
import { Grid, Row } from 'react-native-easy-grid';
import { Content, List, Button, Text } from 'native-base';
import { View } from 'react-native';
import { routes, RouteInfo, Route } from '../../../navigation/navigator';
import style from './style';
import DrawerItem from '../DrawerItem';
import DrawerHeader from '../DrawerHeader';

/** DrawerContents props */
export interface OwnProps {
  onPress(route: Route): void;
}

const DrawerContents: React.StatelessComponent<OwnProps> = (props) => {
  return (
    <Content style={style.content} >
      <DrawerHeader />
      <List style={{ height: 470 }}>
        {getDrawerItems(props, routes)}
      </List>
      <View>
      <Button danger full>
      <Text> Logout </Text>
      </Button>
      </View>
    </Content>
  );
};

function getDrawerItems(props: OwnProps, routes: RouteInfo[]): JSX.Element[] {
  return routes.map(route => <DrawerItem icon={route.icon} key={route.name} name={route.name} onPress={props.onPress} />);
}

export default DrawerContents;
