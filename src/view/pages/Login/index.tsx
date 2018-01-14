import * as React from 'react';
import { Image, View } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Thumbnail, Grid, Row, Col } from 'native-base';
import { icons } from '../../assets/';

export default class Login extends React.Component {
  public render() {
    const logoSize = 100;
    return (

      <Container>
        <Header />
        <Content>
          <View style={{ justifyContent: 'center',alignItems: 'center' }}>
            <Image style={{ height: 200, width: 200 }} source={icons.logo} />
          </View>
          <Form>
            <Item floatingLabel style={{ backgroundColor:'#F2F2F2', justifyContent: 'center',alignItems: 'center', width:330 }}>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel style={{ backgroundColor:'#F2F2F2', justifyContent: 'center',alignItems: 'center', width:330 }}>
              <Label>Password</Label>
              <Input />
            </Item>
          </Form>
          <Button transparent info style={{ paddingLeft: 230 }}>
            <Text style={{ fontSize:10 }} >Forgot Password?</Text>
          </Button>
          <View style={{ justifyContent: 'center',alignItems: 'center', width:350, paddingLeft: 10 }}>
            <Button block primary style={{}}>
              <Text>Login</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}
