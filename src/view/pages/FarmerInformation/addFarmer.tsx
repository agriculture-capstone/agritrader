import * as React from 'react';
import { Container, Header, H1, H2, H3, Content, Grid, Row, Col, Form, Item, Input, Label, Radio, Button, Right, ListItem, InputGroup, Picker } 
from 'native-base';
import { View, Text, StyleSheet } from 'react-native';

import styles from './style';
import { OwnState as FarmerOwnState, FarmerInformation } from './index';

interface OwnProps extends FarmerOwnState {
  updatePaymentCycle(value: string): void;
  updatePaymentMethod(value: string): void;
}

/**
 * Stateless component for viewing farmer information
 */
const AddFarmer = (props: OwnProps) => {
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
          <Row style={{ paddingTop: 28, paddingLeft: 14 }}>
            <Col>
              <Label style={styles.label}>Payment Cycle</Label>
            </Col>
            <Col>
              <Label style={styles.label}>Payment Method</Label>
            </Col>
          </Row>
          <Row style={styles.picker}>
            <Col>
              <Picker
                style={{ paddingTop: 77 }}
                iosHeader="Select payment method"
                mode="dropdown"
                selectedValue={props.selectedPaymentMethod}
                onValueChange={props.updatePaymentMethod}
              >
                <Picker.Item label="Mobile" value="Mobile" />
                <Picker.Item label="Cash" value="Cash" />
              </Picker>
            </Col>
            <Col>
              <Picker
                style={{ paddingTop: 77 }}
                iosHeader="Select payment cycle"
                mode="dropdown"
                selectedValue={props.selectedPaymentCycle}
                onValueChange={props.updatePaymentCycle}
              >
                <Picker.Item label="Weekly" value="Weekly" />
                <Picker.Item label="Bi-Weekly" value="Bi-weekly" />
                <Picker.Item label="Monthly" value="Monthly" />
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
            <Col style={{ paddingLeft: 7 , paddingRight: 7 }}>
              <Button block danger>
                <Text style={styles.buttonText}>CANCEL</Text>
              </Button>
            </Col>
            <Col style={{ paddingLeft: 7 , paddingRight: 7 }}>
              <Button block success>
                <Text style={styles.buttonText}>ADD</Text>
              </Button>
            </Col>
          </Row>
        </Grid> 
      </Form>
    </Content>
  );
};

export default AddFarmer;
