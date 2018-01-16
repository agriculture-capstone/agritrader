import * as React from 'react';
import { styles } from '../style';
import { icons } from '../../../assets/';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';

import UserInput from './UserInput';
import ButtonSubmit from './ButtonSubmit';
import ForgotPassword from './ForgotPassword';

interface OwnState {
  press: boolean;
  showPass: boolean;
}

export default class Form extends React.Component<{}, OwnState> {
  constructor(props: any) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
    };
    this.showPass = this.showPass.bind(this);
  }

  public showPass() {
    this.state.press === false ? this.setState({ showPass: false, press: true }) : this.setState({ showPass: true, press: false });
  }

  public render() {
    return (
      <KeyboardAvoidingView
        behavior="height"
        style={styles.formContainer}
      >
        <UserInput 
          source={icons.username}
          secureTextEntry={false}
          placeholder="Username"
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false} 
        />
        <UserInput 
          source={icons.password}
          secureTextEntry={this.state.showPass}
          placeholder="Password"
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false} 
        />
      </KeyboardAvoidingView>
    );
  }
}



