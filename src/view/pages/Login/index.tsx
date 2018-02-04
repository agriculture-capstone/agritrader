import * as React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import {
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Grid,
  Row,
  Col,
  Content,
  Spinner,
} from 'native-base';
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';

import { images } from '../../assets/';
import styles from './style';
import { State, LoginPayload } from '../../../store/types';
import rootActions from '../../../store/actions';
import Composer from '../../hoc/PageComposer';
import CoreAPI from '../../../utils/CoreAPI/index';
import { AuthenticationError } from '../../../errors/AuthenticationError';

interface OwnState {
  username: string;
  password: string;
  showError: boolean;
  loggingIn: Promise<LoginPayload> | null;
}

interface OwnProps {

}

interface StoreProps {

}

interface DispatchProps {
  login(payload: { uuid: string, jwt: string }): void;
}
/**
 *Login Properties
 */
export type PropsType = OwnProps & StoreProps & DispatchProps;

/**
 *Container for the Login screen
 */
class Login extends React.Component<PropsType, OwnState> {

  public constructor(props: PropsType) {
    super(props);

    this.state = {
      username: '',
      password: '',
      showError: false,
      loggingIn: null,
    };
  }

  private loginPress = () => {
    const { username, password } = this.state;

    if (!this.state.loggingIn) {
      const loggingIn = CoreAPI.login(username, password);
      this.setState(state => ({ loggingIn }));
      loggingIn
        .then(payload => void this.props.login(payload))
        .catch((e) => {
          if (e.name === AuthenticationError.name) {
            this.setState(state => ({ showError: true }));
          } else {
            throw e;
          }
        })
        // tslint:disable-next-line:no-console
        .catch(e => void console.log(e.message || e))
        .then(() => void (this.setState(state => ({ loggingIn: null }))))
        ;
    }
  }

  private onUsernameChange = (username: string) => void (this.setState(state => ({ username })));
  private onPasswordChange = (password: string) => void (this.setState(state => ({ password })));

  private spinnerOverlay = () => {
    return (
      <View style={styles.spinnerContainer}>
        <Spinner color="red" style={styles.spinner} />
      </View>
    );
  }

  /**
   *Render method for Login screen
  */
  public render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
      >
      {this.state.loggingIn && this.spinnerOverlay()}
        <Content style={styles.container}>
          <Form style={styles.form}>
            <Grid>
              <Row>
                <Col style={styles.centerContent}>
                  <Image style={styles.logo} source={images.logo} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Item floatingLabel style={styles.label} >
                    <Label style={{ color: 'white', paddingLeft: 8 }}>Username</Label>
                    <Input
                      style={{ color:'white' }}
                      onChangeText={this.onUsernameChange}
                    />
                  </Item>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Item floatingLabel style={styles.label}>
                    <Label style={{ color: 'white', paddingLeft: 8 }}>Password</Label>
                    <Input
                      secureTextEntry={true}
                      style={{ color:'white' }}
                      onChangeText={this.onPasswordChange}
                    />
                  </Item>
                </Col>
              </Row>
              <Row>
                {this.state.showError && <Text style={styles.errorMessage}>Invalid username or password, please try again</Text>}
              </Row>
              </Grid>
              <View style={styles.buttonRow}>
                  <Button
                    block
                    light
                    onPress={this.loginPress}
                  >
                    <Text>Sign In</Text>
                  </Button>
                </View>
          </Form>
        </Content>
      </KeyboardAvoidingView>
    );
  }
}

const LoginPage = new Composer<PropsType>(Login).page;

const mapStateToProps: MapStateToProps<StoreProps, OwnProps, State> = (state) => {
  return {};
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch) => {
  return {
    login: (payload: { uuid: string, jwt: string }) => dispatch(rootActions.login(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);
