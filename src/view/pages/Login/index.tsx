import * as React from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
export default class Login extends React.Component {
  public render() {
    return (
      <Container>
        <Header />
        <Content>
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
