import * as React from 'react';
import { Text, Grid, Row, Col, Icon } from 'native-base';
import { images } from '../../../assets';
import {
  Image, View
} from 'react-native';

import style from './style';

interface OwnProps {

}

const DrawerHeader: React.StatelessComponent<OwnProps> = (props) => {
  return (
    <Grid style={style.container}>
      <Row><View style={style.logo} >
      <Image source={images.truck_icon} style={style.logoicon}/>
      </View>
      </Row>
      <Row>
      <View style={style.user}>
        <Text style={style.userFullName}>
          Trader Joe
          </Text>
          <Text style={style.username}>
          myusername
          </Text></View>
     
      </Row>
    </Grid>
  );
};

export default DrawerHeader;
