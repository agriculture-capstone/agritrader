import * as React from 'react';
import { H1, H2, H3, Input, Content, Grid, Row, Col, Label, Button, Text } from 'native-base';

import Composer from '../../../../hoc/PageComposer';
import { StoreRow } from '../../../../../store/types';
import { Farmer } from '../../../../../store/modules/farmer/types';
import { Route } from '../../../../navigation/navigator';

import styles from '../../styles';


interface OwnPropsType {
}

interface DispatchPropsType {
  navigate(route: Route): void;
  goBack(): void;
}

interface StorePropsType {
  farmer: StoreRow<Farmer>;
}

type PropsType = OwnPropsType & DispatchPropsType & StorePropsType;

interface OwnStateType {
}

/**
 * Container for application
 */
class Info extends React.Component<PropsType, OwnStateType> {

  constructor(props: OwnPropsType) {
    super(props);
  }

  /**
   * Render method for Farmer Information
   */
  public render() {
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
  }
}

export default new Composer<PropsType>(Info)
  .page;
