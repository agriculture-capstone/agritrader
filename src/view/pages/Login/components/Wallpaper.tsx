import * as React from 'react';
import { styles } from '../style';
import {
	View,
	Image,
} from 'react-native';

const Wallpaper: React.StatelessComponent = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#0fc6ce' }}>
      {props.children}
    </View>
  );
};
export default Wallpaper;

