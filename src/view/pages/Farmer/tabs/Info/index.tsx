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

  /** Create edit button */
  private renderEditButton = () => {
    return (this.renderButton('Edit', 'PRIMARY'));
  }

  /** Handle pressing edit button */
  private onEditPress = () => this.props.navigate(Route.);

  private formatRow(label: string, value: string | number) {
    return (
      <Grid>
        <Row>
          <Col>
            <Text>{label}</Text>
          </Col>
          <Col>
            <Text>{value}</Text>
          </Col>
        </Row>
      </Grid>
    );
  }

  private renderDetailFields() {
    return (
      <List>
        <ListItem>
          {this.formatRow('Phone Number', this.props.milkEntry.amountOfProduct)}
        </ListItem>
        <ListItem>
          {this.formatRow('Notes', this.props.milkEntry.quality)}
        </ListItem>
      </List>
    );
  }

  /**
   * Render method for Farmer Information
   */
  public render() {
    return(
      <Content padder style={styles.content}>
      <Grid>
        <Row style={styles.farmerName}>
          <H1>{this.props.farmerFirstName} {this.props.farmerLastName}</H1>
        </Row>
        {this.renderDetailFields()}
        <Row style={styles.buttonRow}>
          {this.renderEditButton()}
        </Row>
      </Grid>
    </Content>
    );
  }
}

export default new Composer<PropsType>(Info)
  .page;
