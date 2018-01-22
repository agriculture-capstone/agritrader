import * as React from 'react';
import {
  Image,
  KeyboardAvoidingView,
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
} from 'native-base';
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';

import { images } from '../../assets/';
import styles from './style';
import { State } from '../../../store/types';
import { Route } from '../../navigation/navigator';
import navActions from '../../../store/modules/nav/actions';
import createPage from '../../generators/Page/index';

interface OwnState {
  username: string;
  password: string;
}

interface OwnProps {

}

interface StoreProps {

}

interface DispatchProps {
  navigateToHome(): void;
}
/**
 *Login Properties
 */
export type Props = OwnProps & StoreProps & DispatchProps;

/**
 *Container for the Login screen
 */
class Login extends React.Component<Props, OwnState> {

  public constructor(props: Props) {
    super(props);

    // TODO: Should not be storing password in memory if we can help it
    this.state = {
      username: '',
      password: '',
    };
  }

  private updateUsername = (value: string) => {
    // TODO: Use function argument
    this.setState({ username: value });
  }

  private updatePassword = (value: string) => {
    // TODO: Use function argument
    this.setState({ password: value });
  }

  private loginPress = () => {
    // TODO: Don't just let into app
    this.props.navigateToHome();
    this.setState({ password: '' });
    /*
    auth: boolean = authenticate(this.state.username, this.state.password);
    if(auth){
      this.updatePassord('');
      save username to redux state
      store.dispatch({type: string, username: this.state.username})
      redirect to landing page
    }
    else {
      alert('incorrect username or password')
    }
    */

  }
/**
 *Render method for Login screen
 */
  public render() {
    return (
      <KeyboardAvoidingView
        style={{ backgroundColor: '#3F51B5', flex: 1 }}
      >
        <Content padder>
          <Form >
            <Grid>
              <Row>
                <Col style={styles.centerContent}>
                  <Image style={styles.logo} source={images.logo_dark} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Item floatingLabel style={styles.label} >
                    <Label style={{ color: 'white', paddingLeft: 8 }}>Username</Label>
                    <Input onChangeText={this.updateUsername} style={{ color:'white' }} />
                  </Item>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Item floatingLabel style={styles.label}>
                    <Label style={{ color: 'white', paddingLeft: 8 }}>Password</Label>
                    <Input onChangeText={this.updatePassword} secureTextEntry={true} style={{ color:'white' }} />
                  </Item>
                </Col>
              </Row>
              <Row style={styles.buttonRow}>
                <Col>
                  <Button
                    block
                    primary
                    style={styles.loginButton}
                    onPress={this.loginPress}
                  >
                    <Text style={styles.buttonText}>Sign In</Text>
                  </Button>
                </Col>
              </Row>
            </Grid>
          </Form>
        </Content>
      </KeyboardAvoidingView>

    );
  }
}

const LoginPage = createPage(Login);

const mapStateToProps: MapStateToProps<StoreProps, OwnProps, State> = (state) => {
  return {};
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch) => {
  return {
    navigateToHome: () => dispatch(navActions.navigateTo(Route.HOME)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);
