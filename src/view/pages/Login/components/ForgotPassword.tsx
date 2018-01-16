import * as React from 'react';
import { styles } from '../style';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
} from 'react-native';

interface OwnState {
  isLoading: boolean;
}

export default class ForgotPassword extends React.Component<{}, OwnState> {
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
      <View style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPasswordtext}>Forgot Password?</Text>
      </View>
    );
  }
}
