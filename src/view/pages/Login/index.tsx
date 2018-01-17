import * as React from 'react';
import {
  Image,
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

export default class Login extends React.Component {
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
                    <Label style={styles.labelText}>Username</Label>
                    <Input />
                  </Item>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Item floatingLabel style={styles.label}>
                    <Label style={styles.labelText}>Password</Label>
                    <Input />
                  </Item>
                </Col>
              </Row>
              <Row style={styles.buttonRow}>
                <Col>
                  <Button block primary style={styles.loginButton}>
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
