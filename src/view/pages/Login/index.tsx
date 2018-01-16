import * as React from 'react';
import {
  Image,
  View,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Right,
  Grid,
  Row,
  Col,
  Icon,
} from 'native-base';
import { icons } from '../../assets/';
import { styles } from './style';

export default class Login extends React.Component {
  public render() {
    const logoSize = 100;
    return (
      <Container>
        <Content padder>
          <Form>
            <Grid>
              <Row>
                <Image style={{ height: 200, width: 200 }} source={icons.logo} />
              </Row>
              <Item floatingLabel >
                <Label >Username</Label>
                <Input />
              </Item>
              <Item floatingLabel>
                <Label >Password</Label>
                <Input />
              </Item>
              <Button block primary >
                <Text >Login</Text>
              </Button>
            </Grid>
          </Form>
        </Content>
      </Container >
    );
  }
}
