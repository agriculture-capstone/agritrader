import * as React from 'react';
import {
  Image,
  TouchableHighlight,
} from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Grid,
  Row,
  Col,
} from 'native-base';
import { images } from '../../assets/';
import { styles } from './style';



export default class Login extends React.Component<{}, {}>{

  public state = {
    username: '',
    password: '',
  };

  private updateUsername = (value: string) => {
    this.setState({ username: value });
  }

  private updatePassword = (value: string) => {
    this.setState({ password: value });
  }

  private loginPress = () => {
    alert(`Login Pressed - username:${this.state.username} password:${this.state.password}`);
    //
  }

  public render() {
    const logoSize = 100;
    return (
      <Container style={styles.container}>
        <Content padder>
          <Form>
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
                    <Input onChangeText={this.updateUsername} />
                  </Item>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Item floatingLabel style={styles.label}>
                    <Label style={{ color: 'white', paddingLeft: 8 }}>Password</Label>
                    <Input onChangeText={this.updatePassword} secureTextEntry={true} />
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
                    <Text style={styles.buttonText}>Login</Text>
                  </Button>
                </Col>
              </Row>
            </Grid>
          </Form>
        </Content>
      </Container >
    );
  }
}
