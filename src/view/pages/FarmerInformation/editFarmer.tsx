import * as React from 'react';
import { Container, Header, H1, H2, H3, Content, Grid, Row, Col, Form, Item, Input, Label, Radio, Button, Right, ListItem, InputGroup, Picker } 
from 'native-base';
import { View, Text, StyleSheet } from 'react-native';

import styles from './style';
import { OwnState } from './index';

/**
 * Stateless component for viewing farmer information
 */
const EditFarmer = (props: OwnState) => {
  return (
    <Container>
      <Content padder>
      <Grid>
        <Row style={styles.infoLabel}>
          <Col>
            <Label>First Name</Label>
            </Col>
            <Col>
            <Label>Last Name</Label>
          </Col>
        </Row>
        <Row style={styles.input}>
          <Col>
            <Input>
            <H3>{props.farmerFirstName}</H3>
            </Input>
          </Col>
          <Col>
            <Input>
            <H3>{props.farmerLastName}</H3>
            </Input>
          </Col>
        </Row>
        <Row style={styles.infoLabel}>
          <Label>Phone Number</Label>
        </Row>
        <Row style={styles.input}>
          <Input>
          <H3>{props.farmerPhoneNumber}</H3>
          </Input>
        </Row>
        <Row style={styles.infoLabel}>
          <Label>Business Name</Label>
        </Row>
        <Row style={styles.input}>
          <Input>
          <H3>{props.farmerBusinessName}</H3>
          </Input>
        </Row>
        <Row style={styles.infoLabel}>
          <Col>
          <Label>Payment Cycle</Label>
          </Col> 
          <Col>
          <Label>Payment Method</Label>
          </Col>
        </Row>
        <Row style={styles.input}>
          <Col>
          <Input>
              <H3>{props.selectedPaymentCycle}</H3>
          </Input>
          </Col> 
          <Col>
          <Input>
              <H3>{props.selectedPaymentMethod}</H3>
          </Input>
          </Col>
        </Row>
        <Row style={styles.infoLabel}>
          <Label>Notes</Label>
        </Row>
        <Row style={styles.input}>
          <Input>
            <H3>{props.farmerNotes}</H3>
          </Input>
        </Row>
        <Row style={{ paddingTop: 77 }}>
          <Col style={{ paddingLeft: 7 , paddingRight: 7 }}>
          <Button block danger>
            <Text style={styles.buttonText}>CANCEL</Text>
          </Button>
          </Col>
          <Col style={{ paddingLeft: 7 , paddingRight: 7 }}>
          <Button block success>
            <Text style={styles.buttonText}>SAVE</Text>
          </Button>
          </Col>
        </Row>
      </Grid>
      </Content>
    </Container>
  );
};

export default EditFarmer;
