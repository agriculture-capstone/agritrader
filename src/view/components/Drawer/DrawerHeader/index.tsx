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
      <View style={style.logo} >
      <Image source={images.truck_icon} style={style.logoicon}/>
      </View>
      <View style={style.user}>
        <Text style={style.userFullName}>
          Trader Joe
          </Text>
          <Text style={style.username}>
          traderjoe
          </Text></View>
     
      
    </Grid>
  );
};

export default DrawerHeader;
