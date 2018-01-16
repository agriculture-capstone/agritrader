import * as React from 'react';
import { styles } from '../style';
import {
	StyleSheet,
	View,
	TextInput,
	Image,
} from 'react-native';

export interface OwnProps {
  source: any;
  placeholder: string;
  secureTextEntry: boolean;
  autoCorrect: boolean;
  autoCapitalize: any;
  returnKeyType: any;
}

const UserInput: React.StatelessComponent<OwnProps> = (props) => {
  return (
		<View style={styles.inputWrapper}>
			<Image
				source={props.source}
				style={styles.inlineImg}
			/>
			<TextInput
				style={styles.input}
				placeholder={props.placeholder}
				secureTextEntry={props.secureTextEntry}
				autoCorrect={props.autoCorrect}
				autoCapitalize={props.autoCapitalize}
				returnKeyType={props.returnKeyType}
				placeholderTextColor="white"
				underlineColorAndroid="transparent"
			/>
		</View>
  );
};

export default UserInput;
/*
export default class UserInput extends React.Component<OwnProps, OwnState> {
  public render() {
    return (
			<View style={styles.inputWrapper}>
				<Image
					source={this.props.source}
					style={styles.inlineImg}
				/>
				<TextInput
					style={styles.input}
					placeholder={this.props.placeholder}
					secureTextEntry={this.props.secureTextEntry}
					autoCorrect={this.props.autoCorrect}
					autoCapitalize={this.props.autoCapitalize}
					returnKeyType={this.props.returnKeyType}
					placeholderTextColor="white"
					underlineColorAndroid="transparent"
				/>
			</View>
    );
  }
}
*/

