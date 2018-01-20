import * as React from 'react';
import { Container, Header, H1, H2, H3, Content, Grid, Row, Col, Form, Item, Input, Label, Radio, Button, Right, ListItem, InputGroup, Picker }
from 'native-base';
import { View, Text, StyleSheet } from 'react-native';

import styles from './style';
// import FarmerInformation, { OwnProps as FarmerOwnProps } from '.';

// interface OwnProps extends FarmerOwnProps {
//   updatePaymentCycle(value: string): void;
//   updatePaymentMethod(value: string): void;
// }

export interface OwnProps {
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
 * Stateless component for viewing farmer information
 */
const AddFarmer = (props: OwnProps) => {
  
  const modeHandler = () => {
    props.modeHandler('view');
  };

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
              <Button block danger>
                <Text style={styles.buttonText}>CANCEL</Text>
              </Button>
            </Col>
            <Col style={styles.farmerInfoButtonCol}>
              <Button block success onPress={modeHandler}>
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
