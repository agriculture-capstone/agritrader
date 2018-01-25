import * as React from 'react';

import { H1, H2, H3, Input, Content, Grid, Row, Col, Label, Button, Text, Picker } from 'native-base';

import createPage from '../../../../generators/Page/index';

import styles from '../../styles';

interface OwnStateType {
  mode: PageMode;
}

interface OwnPropsType {
  farmerFirstName: string;
  farmerLastName: string;
  farmerPhoneNumber: string;
  farmerNotes: string;
}

interface DispatchPropsType {
}

interface StorePropsType {
}

type PropsType = OwnPropsType & DispatchPropsType & StorePropsType;

/**
 * Modes to determine how to render farmer information
 */
type PageMode = 'view' | 'edit';

/**
 * Container for application
 */
class FarmerInformation extends React.Component<PropsType, OwnStateType> {

  constructor(props: OwnPropsType) {
    super(props);
    this.state = { 
      mode: 'view',
    };
  }

  private changeToViewMode = () => this.changeMode('view');

  private changeToEditMode = () => this.changeMode('edit');

  private changeMode = (newMode: PageMode) => {
    this.setState(state => ({ mode: newMode }));
  }

  /**
   * Render method for Farmer Information
   */
  public render() {
    if (this.state.mode === 'view') {
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
              <Label>Notes</Label>
            </Row>
            <Row style={styles.infoLabel}>
              <H2>{this.props.farmerNotes}</H2>
            </Row>
            <Row style={styles.editButton}>
              <Col>
                <Button block danger onPress={this.changeToEditMode}>
                  <Text style={styles.buttonText}>Edit</Text>
                </Button>
              </Col>
            </Row>
          </Grid>
        </Content>
      );
    } else if (this.state.mode === 'edit') {
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
              <Label>Notes</Label>
            </Row>
            <Row style={styles.input}>
              <Input>
                <H3>{this.props.farmerNotes}</H3>
              </Input>
            </Row>
            <Row style={styles.farmerInfoButtonRow}>
              <Col style={styles.farmerInfoButtonCol}>
              <Button block success onPress={this.changeToViewMode}>
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
