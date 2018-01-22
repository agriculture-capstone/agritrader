import * as React from 'react';

import { Content, Grid, Row, Col, Input, Label, Button, H3 } from 'native-base';
import { Text } from 'react-native';

import styles from './style';

interface OwnPropsType {
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
const EditFarmer = (props: OwnPropsType) => {

  /**
   * Handles chaning the mode to view farmer
   */
  const modeHandler = () => {
    props.modeHandler('view');
  };

  return (
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
        <Row style={styles.farmerInfoButtonRow}>
          <Col style={styles.farmerInfoButtonCol}>
          <Button block success onPress={modeHandler}>
            <Text style={styles.buttonText}>SAVE</Text>
          </Button>
          </Col>
        </Row>
      </Grid>
    </Content>
  );
};

export default EditFarmer;
