import * as React from 'react';
import { Text, Grid, Row, Col, Icon } from 'native-base';
import { Image, View } from 'react-native';

import { images } from '../../../assets';
import style from './style';

interface OwnProps {
  name: string;
  username: string;
}

/**
 * Header component for the drawer
 */
const DrawerHeader: React.StatelessComponent<OwnProps> = (props) => {
  return (
    <Grid style={style.container}>
      <Row>
        <View style={style.logo} >
          <Image source={images.truck_icon} style={style.logoicon} />
        </View>
      </Row>
      <Row>
        <View style={style.user}>
          <Text style={style.userFullName}>
            {props.name}
          </Text>
          <Text style={style.username}>
            {props.username}
          </Text>
        </View>
      </Row>
    </Grid>
  );
};

export default DrawerHeader;
