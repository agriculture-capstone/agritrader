import * as React from 'react';
import { Container, Header, H1, H2, H3, Content, Grid, Row, Col, Form, Item, Input, Label, Radio, Button, Right, ListItem, InputGroup, Picker } 
from 'native-base';
import { View, Text, StyleSheet } from 'react-native';

import styles from './style';
// import { OwnProps as FarmerOwnProps }  from './index';

interface OwnProps {
  farmerFirstName: string;
  farmerLastName: string;
  farmerPhoneNumber: string;
  farmerBusinessName: string;
  farmerNotes: string;
  selectedPaymentCycle: string;
  selectedPaymentMethod: string;
  modeHandler: Function;
}

/**
 * Stateless component for viewing farmer information
 */
const ViewFarmer = (props: OwnProps) => {

  const modeHandler = () => {
    props.modeHandler('edit');
  };

  return (
    <Content padder>
      <Grid>
        <Row style={styles.farmerName}>
          <H1>{props.farmerFirstName} {props.farmerLastName}</H1>
        </Row>
        <Row style={styles.infoLabel}>
          <Label>Phone Number</Label>
        </Row>
        <Row style={styles.infoLabel}>
          <H2>{props.farmerPhoneNumber}</H2>
        </Row>
        <Row style={styles.infoLabel}>
          <Label>Business Name</Label>
        </Row>
        <Row style={styles.infoLabel}>
          <H2>{props.farmerBusinessName}</H2>
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
            <H2>{props.selectedPaymentCycle}</H2>
          </Col> 
          <Col>
            <H2>{props.selectedPaymentMethod}</H2>
          </Col>
        </Row>
        <Row style={styles.infoLabel}>
          <Label>Notes</Label>
        </Row>
        <Row style={styles.infoLabel}>
          <H2>{props.farmerNotes}</H2>
        </Row>
        <Row style={styles.editButton}>
          <Col>
            <Button block danger onPress={modeHandler}>
              <Text style={styles.buttonText}>Edit</Text>
            </Button>
          </Col>
        </Row>
      </Grid>
    </Content>
  );
};

export default ViewFarmer;
