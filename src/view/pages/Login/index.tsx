import * as React from 'react';
import { Image, View } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Right, Grid, Row, Col } from 'native-base';
import { icons } from '../../assets/';
import { styles } from './style';

export default class Login extends React.Component {
  public render() {
    const logoSize = 100;
    return (

      <Container>
        <Header />
        <Content>
          <Grid style={{ alignItems: 'center' }}>
            <Row>
              <Image style={{ height: 200, width: 200 }} source={icons.logo} />
            </Row>
          </Grid>
            <Form>
              <Grid style={{ alignItems: 'center' }}>
                <Row>
                  <Item floatingLabel style={styles.textFields}>
                    <Label style={{ paddingLeft: 8 }}>Username</Label>
                    <Input />
                  </Item>
                </Row>
                <Row>
                  <Item floatingLabel style={styles.textFields}>
                    <Label style={{ paddingLeft: 8 }}>Password</Label>
                    <Input />
                  </Item>
                </Row>
              </Grid>
            </Form>
          <Grid style={{ alignItems: 'center' }}>
            <Row >
              <Right>
                <Button transparent info>
                  <Text style={{ fontSize:10 }} >Forgot Password?</Text>
                </Button>
              </Right>
            </Row>
            <Row >
              <Button block primary style={styles.loginButton}>
                <Text>Login</Text>
              </Button>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}
