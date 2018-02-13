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
import rootThunks from '../../../store/thunks';
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
  loggedIn: boolean;
}

interface DispatchProps {
  login(payload: { uuid: string, jwt: string }): Promise<void>;
  bypassLogin(): Promise<void>;
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
        // If successful, login
        .then(async (payload) => {
          this.setState(state => ({ loggingIn: null }));
          await this.props.login(payload);
        })
        // If unsuccessful, stop spinner and check error
        .catch((e) => {
          this.setState(state => ({ loggingIn: null }));
          if (e.id === AuthenticationError.id) {
            this.setState(state => ({ showError: true }));
          } else {
            throw e;
          }
        })
        // If unknown error, log it
        // tslint:disable-next-line:no-console
        .catch(e => void console.log(e.message || e))
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

  /** React componentWillMount */
  public componentWillMount() {
    if (this.props.loggedIn) {
      this.props.bypassLogin();
    }
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
  return {
    loggedIn: !!state.sensitiveInfo.jwt,
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch) => {
  return {
    login: async (payload: { uuid: string, jwt: string }) => dispatch(rootThunks.login(payload)),
    bypassLogin: async () => dispatch(rootThunks.bypassLogin()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);
