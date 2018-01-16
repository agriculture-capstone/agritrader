import * as React from 'react';
import { styles, deviceHeight, deviceWidth } from '../style';
import { icons } from '../../../assets';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Easing,
  Image,
  Alert,
  View,
} from 'react-native';

interface OwnState {
  isLoading: boolean;
}

export default class ButtonSubmit extends React.Component <{},OwnState>{
  constructor(props: any) {
    super(props);

    this.state = {
      isLoading: false,
    };
    this.onPress = this.onPress.bind(this);
  }

  public onPress() {
    if (this.state.isLoading) return;
    this.setState({ isLoading: true });
  }

  public render() {
    return (
      <View style={styles.submitContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={this.onPress}
            activeOpacity={1} 
          >
            <Text style={styles.submitText}>LOGIN</Text>
            {/* {this.state.isLoading ? <Image source={icons.loading} style={styles.submitImage} /> :<Text style={styles.submitText}>LOGIN</Text>} */}
          </TouchableOpacity>
      </View>
    );
  }
}

