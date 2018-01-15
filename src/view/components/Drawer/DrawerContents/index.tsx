import * as React from 'react';
import { Grid, Row } from 'react-native-easy-grid';

import { routes, RouteInfo } from '../../../navigation/navigator';
import DrawerItem from './DrawerItem';

/** DrawerContents props */
export interface OwnProps {}

const DrawerContents: React.StatelessComponent<OwnProps> = (props) => {
  return (
    <Grid>
      <Row style={{ backgroundColor: 'blue' }} />
      {getDrawerItems(routes)}
    </Grid>
  );
};

function getDrawerItems(routes: RouteInfo[]): JSX.Element[] {
  return routes.map(route => <DrawerItem icon={route.icon} key={route.name} text={route.name} />);
}

export default DrawerContents;
