import * as React from 'react';
import { Container, Header, H1, H2, H3, Content, Grid, Row, Col, Form, Item, Input, Label, Radio, Button, Right, ListItem, InputGroup, Picker } 
from 'native-base';
import { View, Text, StyleSheet } from 'react-native';

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

export class ViewFarmer extends React.Component <(OwnProps),(OwnState)> {
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

  /**
   * Render method for Farmer Information
   */
  public render() {
    return (
      <Container>
          <Content padder>
          <Grid>
            <Row style={styles.name}>
              <H1>{this.state.farmerFirstName} {this.state.farmerLastName}</H1>
            </Row>
            <Row style={styles.infoLabel}>
              <Label>Phone Number</Label>
            </Row>
            <Row style={styles.infoLabel}>
              <H2>{this.state.farmerPhoneNumber}</H2>
            </Row>
            <Row style={styles.infoLabel}>
              <Label>Business Name</Label>
            </Row>
            <Row style={styles.infoLabel}>
              <H2>{this.state.farmerBusinessName}</H2>
            </Row>
            <Row style={styles.infoLabel}>
              <Col>
                <Label>Payment Cycle</Label>
              </Col> 
              <Col>
                <Label>Payment Method</Label>
              </Col>
            </Row>
            <Row style={styles.infoLabel}>
              <Col>
                <H2>{this.state.selectedPaymentCycle}</H2>
              </Col> 
              <Col>
                <H2>{this.state.selectedPaymentMethod}</H2>
              </Col>
            </Row>
            <Row style={styles.infoLabel}>
              <Label>Notes</Label>
            </Row>
            <Row style={styles.infoLabel}>
              <H2>{this.state.farmerNotes}</H2>
            </Row>
            <Row style={styles.editButton}>
              <Col>
                <Button block danger>
                  <Text style={styles.buttonText}>Edit</Text>
                </Button>
              </Col>
            </Row>
          </Grid>
          </Content>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    alignSelf: 'center',
    paddingTop: 28,
    paddingBottom: 14,
  },
  input: {
    paddingLeft: 21,
  },
  infoLabel: {
    paddingLeft: 21,
    paddingTop: 14,
  },
  label: {
    color: 'black',
  },
  picker: {
    paddingLeft: 14,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  editButton: {
    paddingLeft: 21,
    paddingRight: 21,
    paddingTop: 21,
  },
});
