import * as React from 'react';

import { Content, Grid, Row, Col, Form, Item, Input, Label, Button, Picker } from 'native-base';
import { Text } from 'react-native';

import styles from '../../styles';

/**
 * Holds temorary farmer info
 */
export interface OwnPropsType {
  farmerFirstName: string;
  farmerLastName: string;
  farmerPhoneNumber: string;
  farmerBusinessName: string;
  farmerNotes: string;
  selectedPaymentCycle: string;
  selectedPaymentMethod: string;
  modeHandler: Function;
  updatePaymentCycle(value: string): void;
  updatePaymentMethod(value: string): void;
}

/**
 * Handles changing the mode to view farmer
 */
const modeHandler = (props: OwnPropsType, page: string) => {
  // page === 'view' ? props.modeHandler(page) : false;
  props.modeHandler(page);
};

const updatePaymentCycle = (props: OwnPropsType, value: string) => {
  props.selectedPaymentCycle = value;
};

const updatePaymentMethod = (props: OwnPropsType, value: string) => {
  props.selectedPaymentMethod = value;
};

/**
 * Stateless component for viewing farmer information
 */
const AddFarmer = (props: OwnPropsType) => {
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
          <Row style={styles.paymentLabel}>
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
          <Row style={styles.farmerInfoButtonRow}>
            <Col style={styles.farmerInfoButtonCol}>
              <Button block success onPress={() => modeHandler(props, 'view')}>
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
