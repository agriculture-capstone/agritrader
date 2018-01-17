import * as React from 'react';
import { Container, Header, H1, H2, H3, Content, Grid, Row, Col, Form, Item, Input, Label, Radio, Button, Right, ListItem, InputGroup, Picker } 
from 'native-base';
import { View, Text, StyleSheet } from 'react-native';

import styles from './style';

/**
 * Stateless component for viewing farmer information
 */
const ViewFarmer = (props) => {
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
};

export default ViewFarmer;
