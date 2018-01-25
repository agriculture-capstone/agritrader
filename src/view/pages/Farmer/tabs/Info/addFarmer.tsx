import * as React from 'react';

import { Content, Grid, Row, Col, Form, Item, Input, Label, Button, Picker } from 'native-base';
import { Text } from 'react-native';

import styles from '../../styles';

interface OwnStateType {
  selectedPaymentCycle: string;
  selectedPaymentMethod: string;
}

interface OwnPropsType {
  farmerFirstName: string;
  farmerLastName: string;
  farmerPhoneNumber: string;
  farmerBusinessName: string;
  farmerNotes: string;
}

interface DispatchPropsType {
}

interface StorePropsType {
}

type PropsType = OwnPropsType & DispatchPropsType & StorePropsType;

/**
 * Component for viewing farmer information
 */
class AddFarmer extends React.Component<PropsType, OwnStateType> {

  constructor(props: PropsType) {
    super(props);
    this.state = {
      selectedPaymentCycle: 'Weekly',
      selectedPaymentMethod: 'Mobile',
    };
  }

  private updatePaymentCycle = (value: string) => {
    this.setState(state => ({ selectedPaymentCycle: value }));
  }
  
  private updatePaymentMethod = (value: string) => {
    this.setState(state => ({ selectedPaymentMethod: value }));
  }

  /**
   * Render method for adding a farmer
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
                  selectedValue={this.state.selectedPaymentMethod}
                  onValueChange={this.updatePaymentMethod}
                >
                  <Picker.Item label="Mobile" value="Mobile" />
                  <Picker.Item label="Cash" value="Cash" />
                </Picker>
              </Col>
              <Col>
                <Picker
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
                <Item floatingLabel>
                  <Label>Notes</Label>
                  <Input />
                </Item>
              </Col>
            </Row>
            <Row style={styles.farmerInfoButtonRow}>
              <Col style={styles.farmerInfoButtonCol}>
                <Button block success>
                  <Text style={styles.buttonText}>ADD</Text>
                </Button>
              </Col>
            </Row>
          </Grid>
        </Form>
      </Content>
    );
  }
}

export default AddFarmer;
