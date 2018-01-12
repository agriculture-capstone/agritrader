import * as React from 'react';
import { Container, Header, Content, Grid, Row, Col, Form, Item, Input, Label, Radio, Right, ListItem, InputGroup, Picker } from 'native-base';
import { View, Text } from 'react-native';

/**
 * Container for application
 */
export default class FarmerInformation extends React.Component<{}, {}> {
  /**
   * Render method for App
   */
  public render() {
    return (
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
                      <Input />
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
                  <Item floatingLabel>
                    <Label>Payment Cycle</Label>
                  </Item>
                  <Picker
                    iosHeader="Select one"
                    mode="dropdown"
                    selectedValue={() => {}}
                    onValueChange={() => {}}
                  >
                    <Item label="Weekly" value="key0" />
                    <Item label="Bi-Weekly" value="key1" />
                    <Item label="Monthly" value="key2" />
                  </Picker>
                </Col>
                <Col>
                  <Item floatingLabel>
                    <Label>Payment Method</Label>
                  </Item>
                  <Picker
                    iosHeader="Select one"
                    mode="dropdown"
                    selectedValue={() => {}}
                    onValueChange={() => {}}
                  >
                    <Item label="Mobile" value="key0" />
                    <Item label="Cash" value="key1" />
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
            </Grid> 
          </Form>
        </Content>
    );
  }
}
