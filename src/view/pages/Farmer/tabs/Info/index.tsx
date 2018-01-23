import * as React from 'react';

import { H1, H2, H3, Input, Content, Grid, Row, Col, Label, Button, Text } from 'native-base';

import createPage from '../../../../generators/Page/index';

import styles from '../../styles';

interface OwnStateType {
  mode?: string;
}

interface OwnPropsType {
  farmerFirstName: string;
  farmerLastName: string;
  farmerPhoneNumber: string;
  farmerBusinessName: string;
  farmerNotes: string;
  selectedPaymentCycle: string;
  selectedPaymentMethod: string;
}

interface DispatchPropsType {
}

interface StorePropsType {
}

type PropsType = OwnPropsType & DispatchPropsType & StorePropsType;

/**
 * Modes to determine how to render farmer information
 */
const modes = {
  edit: 'edit',
  view: 'view',
};

/**
 * Container for application
 */
class FarmerInformation extends React.Component<PropsType, OwnStateType> {

  private initialProps: any;

  constructor(props: OwnPropsType) {
    super(props);
    this.state = { 
      mode: 'view',
    };
    
    // this.initialProps = {
    //   farmerFirstName: 'Patrick',
    //   farmerLastName: 'Keenan',
    //   farmerPhoneNumber: '123-456-7890',
    //   farmerBusinessName: 'Farmer with coolest hat',
    //   farmerNotes: 'Doctor from village A',
    //   selectedPaymentCycle: 'Weekly',
    //   selectedPaymentMethod: 'Mobile',
    // };
  }

  private changeMode = (newMode: string) => {
    this.setState(state => ({ mode: newMode }));
  }

  /**
   * Render method for Farmer Information
   */
  public render() {
    if (this.state.mode === modes.view) {
      return (
        <Content padder>
          <Grid>
            <Row style={styles.farmerName}>
              <H1>{this.props.farmerFirstName} {this.props.farmerLastName}</H1>
            </Row>
            <Row style={styles.infoLabel}>
              <Label>Phone Number</Label>
            </Row>
            <Row style={styles.infoLabel}>
              <H2>{this.props.farmerPhoneNumber}</H2>
            </Row>
            <Row style={styles.infoLabel}>
              <Label>Business Name</Label>
            </Row>
            <Row style={styles.infoLabel}>
              <H2>{this.props.farmerBusinessName}</H2>
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
                <H2>{this.props.selectedPaymentCycle}</H2>
              </Col> 
              <Col>
                <H2>{this.props.selectedPaymentMethod}</H2>
              </Col>
            </Row>
            <Row style={styles.infoLabel}>
              <Label>Notes</Label>
            </Row>
            <Row style={styles.infoLabel}>
              <H2>{this.props.farmerNotes}</H2>
            </Row>
            <Row style={styles.editButton}>
              <Col>
                <Button block danger onPress={() => this.changeMode(modes.edit)}>
                  <Text style={styles.buttonText}>Edit</Text>
                </Button>
              </Col>
            </Row>
          </Grid>
        </Content>
      );
    } else if (this.state.mode === modes.edit) {
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
                <H3>{this.props.farmerFirstName}</H3>
                </Input>
              </Col>
              <Col>
                <Input>
                <H3>{this.props.farmerLastName}</H3>
                </Input>
              </Col>
            </Row>
            <Row style={styles.infoLabel}>
              <Label>Phone Number</Label>
            </Row>
            <Row style={styles.input}>
              <Input>
              <H3>{this.props.farmerPhoneNumber}</H3>
              </Input>
            </Row>
            <Row style={styles.infoLabel}>
              <Label>Business Name</Label>
            </Row>
            <Row style={styles.input}>
              <Input>
              <H3>{this.props.farmerBusinessName}</H3>
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
                <H3>{this.props.selectedPaymentCycle}</H3>
              </Input>
              </Col> 
              <Col>
              <Input>
                <H3>{this.props.selectedPaymentMethod}</H3>
              </Input>
              </Col>
            </Row>
            <Row style={styles.infoLabel}>
              <Label>Notes</Label>
            </Row>
            <Row style={styles.input}>
              <Input>
                <H3>{this.props.farmerNotes}</H3>
              </Input>
            </Row>
            <Row style={styles.farmerInfoButtonRow}>
              <Col style={styles.farmerInfoButtonCol}>
              <Button block success onPress={() => this.changeMode(modes.view)}>
                <Text style={styles.buttonText}>SAVE</Text>
              </Button>
              </Col>
            </Row>
          </Grid>
        </Content>
      );
    } else {
      throw new Error('Error: invalid mode ' + this.state.mode);
    }
  }
}

export default createPage(FarmerInformation);