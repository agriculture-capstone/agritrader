import * as React from 'react';
import { styles } from '../style';
import { icons } from '../../../assets/';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

const Logo: React.StatelessComponent = (props) => {
  return (
    <View style={styles.container}>
      <Image source={icons.logo} style={styles.image} />
      {/*<Text style={styles.text}>AgriTrader</Text>*/}
    </View>
  );
};

export default Logo;


