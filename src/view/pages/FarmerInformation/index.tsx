import * as React from 'react';
import { Container, Header, H1, H2, H3, Content, Grid, Row, Col, Form, Item, Input, Label, Radio, Button, Right, ListItem, InputGroup, Picker } 
from 'native-base';
import { View, Text, StyleSheet } from 'react-native';

import ViewFarmer from './viewFarmer';
import EditFarmer from './editFarmer';

import styles from './style';

interface OwnProps {
  mode: string;
}

interface OwnState {
  farmerFirstName: string;
  farmerLastName: string;
  farmerPhoneNumber: string;
  farmerBusinessName: string;
  farmerNotes: string;
  selectedPaymentCycle: string;
  selectedPaymentMethod: string;
}

/**
 * Container for application
 */
export class FarmerInformation extends React.Component<OwnProps, OwnState> {

  constructor(props: OwnProps) {
    super(props);
    this.state = {
      farmerFirstName: 'Patrick',
      farmerLastName: 'Keenan',
      farmerPhoneNumber: '123-456-7890',
      farmerBusinessName: 'Farmer with coolest hat',
      farmerNotes: 'Doctor from village A',
      selectedPaymentCycle: 'Weekly',
      selectedPaymentMethod: 'Mobile',
    };
  }

  private updatePaymentCycle = (value: string) => {
    this.setState(() => ({ selectedPaymentCycle: value }));
  }

  private updatePaymentMethod = (value: string) => {
    this.setState(() => ({ selectedPaymentMethod: value }));
  }

  /**
   * Render method for Farmer Information
   */
  public render() {
    const page = 'edit';

    if (page === modes.view) {
      return <ViewFarmer />;
    } else if (page === modes.add) {
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
                      selectedValue={this.state.selectedPaymentMethod}
                      onValueChange={this.updatePaymentMethod}
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
          </Container>
      );
    } else if (page === modes.edit) {
      return <EditFarmer />;
    }
  }
}

export const modes = {
  add: 'add',
  edit: 'edit',
  view: 'view',
};
