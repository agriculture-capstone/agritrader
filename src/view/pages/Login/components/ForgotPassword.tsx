import * as React from 'react';
import { styles } from '../style';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const ForgotPassword: React.StatelessComponent = (props) => {
  return (
    <View style={styles.forgotPasswordContainer}>
      <Text style={styles.forgotPasswordtext}>Forgot Password?</Text>
    </View>
  );
};

export default ForgotPassword;

// export default class SignupSection extends React.Component {
//   public render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.text}>Forgot Password?</Text>
//       </View>
//     );
//   }
// }
