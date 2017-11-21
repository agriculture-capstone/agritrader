import * as React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

interface Props {
  title: string;
  showButton: boolean;
}

interface State {
  num: number; 
}
/**
 * Container for application
 */
export default class Hello extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      num: 0,
    }

    this.buttonHandler = this.buttonHandler.bind(this);
  }

  buttonHandler() {
    this.setState((state) => {
      return {
        num: state.num + 1
      }
    });
  }

 /**
 * Render method for App
 */
  public render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.props.title}
          stateNumber is {this.state.num}
        </Text>
        { this.props.showButton &&
          <Button title="myButton" onPress={this.buttonHandler}/>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
