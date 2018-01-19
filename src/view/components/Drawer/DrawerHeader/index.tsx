import * as React from 'react';
import { Text } from 'native-base';
import { Grid } from 'react-native-easy-grid';

import style from './style';

interface OwnProps {

}

const DrawerHeader: React.StatelessComponent<OwnProps> = (props) => {
  return (
    <Grid style={style.container}>
      <Text>Hello</Text>
    </Grid>
  );
};

export default DrawerHeader;
