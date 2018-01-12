import * as React from 'react';
import { Container, Header, Content, Grid, Row, Col, Form, Item, Input, Label, Radio, Button, Right, ListItem, InputGroup, Picker } 
from 'native-base';
import { View, Text } from 'react-native';

/**
 * Container for application
 */
export default class FarmerInformation extends React.Component<{}, {}> {

  public state = {
    selectedPaymentCycle: 'Weekly',
    selectedPaymentMethod: 'Mobile',
  };

  private updatePaymentCycle(value: string) {
    // this.setState({ selectedPaymentCycle: value });
    this.state.selectedPaymentCycle = value;
  }

  private updatePaymentMethod(value: string) {
    // this.setState({ selectedPaymentMethod: value });
    this.state.selectedPaymentMethod = value;
  }

  /**
   * Render method for App
   */
  public render() {
    return (
      <Container>
        <Content>
          <Form>
           
            <Grid>
              <Row>
                <Col>
                    <Item floatingLabel>
                      <Label>First Name</Label>
                      <Input />
                    </Item>
                </Col>
                <Col>
                    <Item floatingLabel>
                      <Label>Last Name</Label>
                      <Input />
                    </Item>
                </Col>
              </Row>

              <Row>
                <Col>
                    <Item floatingLabel>
                      <Label>Phone Number</Label>
                      <Input keyboardType={'numeric'}/>
                    </Item>
                </Col>
              </Row>

              <Row>
                <Col>
                    <Item floatingLabel>
                      <Label>Business Name</Label>
                      <Input />
                    </Item>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Label style={{ paddingTop: 28, paddingLeft: 14 }}>Payment Cycle</Label>
                </Col>
                <Col>
                  <Picker
                    style={{ paddingTop: 77 }}
                    iosHeader="Select payment cycle"
                    mode="dropdown"
                    selectedValue={this.state.selectedPaymentCycle}
                    onValueChange={this.updatePaymentCycle}
                  >
                      <Picker.Item label="Weekly" value="Weekly" />
                      <Picker.Item label="Bi-Weekly" value="Bi-weekly" />
                      <Picker.Item label="Monthly" value="Monthly" />
                  </Picker>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Label style={{ paddingTop: 28, paddingLeft: 14  }}>Payment Method</Label>
                </Col>
                <Col>
                  <Picker
                    style={{ paddingTop: 77 }}
                    iosHeader="Select payment method"
                    mode="dropdown"
                    selectedValue={this.state.selectedPaymentMethod}
                    onValueChange={this.updatePaymentMethod}
                  >
                      <Picker.Item label="Mobile" value="Mobile" />
                      <Picker.Item label="Cash" value="Cash" />
                  </Picker>
                </Col>
                </Row>
              <Row>
                <Col>
                    <Item floatingLabel>
                      <Label>Notes</Label>
                      <Input />
                    </Item>
                </Col>
              </Row>
              <Row style={{ paddingTop: 77 }}>
                <Col>
                  <Button block success>
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>ADD</Text>
                  </Button>
                </Col>
                </Row>
            </Grid> 
          </Form>
        </Content>
        </Container>
    );
  }
}
