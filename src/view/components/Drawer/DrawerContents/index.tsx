import * as React from 'react';
import { Grid, Row } from 'react-native-easy-grid';

export interface Props {}

const DrawerContents: React.StatelessComponent<Props> = () => {
  return (
    <Grid>
      <Row style={{ backgroundColor: 'blue' }} />
      <Row style={{ backgroundColor: 'red' }} />
    </Grid>
  );
};

export default DrawerContents;
