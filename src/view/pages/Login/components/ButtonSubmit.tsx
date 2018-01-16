import * as React from 'react';
import { styles, deviceHeight, deviceWidth } from '../style';
import { icons } from '../../../assets';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  Image,
  Alert,
  View,
} from 'react-native';

const MARGIN = 40;
const timeout = 2000;

interface OwnState {
  isLoading: boolean;
}

export default class ButtonSubmit extends React.Component <{},own>{
  private growAnimated: Animated.Value;
  private buttonAnimated: Animated.Value;
  constructor(props: any) {
    super(props);

    this.state = {
      isLoading: false,
    };

    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this.onPress = this.onPress.bind(this);
  }

  public onPress() {
    if (this.state.isLoading) return;

    this.setState({ isLoading: true });
    Animated.timing(
      this.buttonAnimated,
      {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
      },
    ).start();

    setTimeout(() => {
      this.onGrow();
    }, timeout);

    setTimeout(() => {
      this.setState({ isLoading: false });
      this.buttonAnimated.setValue(0);
      this.growAnimated.setValue(0);
    }, timeout);
  }

  public onGrow() {
    Animated.timing(
      this.growAnimated,
      {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
      },
    ).start();
  }

  public render() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [styles.deviceWidth - MARGIN, MARGIN],
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN],
    });

    return (
      <View style={styles.submitContainer}>
        <Animated.View style={{ width: changeWidth }}>
          <TouchableOpacity 
            style={styles.button}
            onPress={this.onPress}
            activeOpacity={1} 
          >
            {this.state.isLoading ? <Image source={icons.loading} style={styles.submitImage} /> :<Text style={styles.submitText}>LOGIN</Text>}
          </TouchableOpacity>
          <Animated.View style={[styles.circle, { transform: [{ scale: changeScale }] }]} />
        </Animated.View>
      </View>
    );
  }
}

