import * as React from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Thumbnail } from 'native-base';
import { icons } from '../../assets/';
export default class Login extends React.Component {
  public render() {
    const logoSize = 80;
    return (
      <Container>
        <Header />
        <Content>
          <Thumbnail square size={logoSize} source={require(icons.logo)} /> 
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input />
            </Item>
          </Form>
          <Button transparent info>
            <Text>Forgot Password?</Text>
          </Button>
          <Button block light>
            <Text>Login</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
