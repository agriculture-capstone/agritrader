import * as React from 'react';
import { Content, List, View, ListItem, Text, Grid, Row, Col, H1, Button, Input, Item } from 'native-base';

import { Farmer } from '../../../store/modules/farmer/types';
import { Dairy as MilkEntry } from '../../../store/modules/dairy/types';

import Styles from './style';

// @TODO delete this
const fakeValues = {
  firstName: 'Patrick',
  lastName: 'Kenaan',

  date: 'Friday, Jan 25, 2018',
  time: '9:35 pm',
  volume: '14',
  quality: '60',
  costPerUnit: '3.6',
};

// @TODO uncomment props
interface OwnPropsType {
  // farmer: Farmer;
  // milkEntry: MilkEntry;
}

interface DispatchPropsType {
}

interface StorePropsType {
}

type PropsType = OwnPropsType & DispatchPropsType & StorePropsType;

interface OwnStateType {
}

/**
 * Button color
 */
type ButtonColor = 'PRIMARY' | 'INFO';

/**
 * Page for EntryDetails
 * @requires farmer
 * @requires milkEntry
 * 
 * @example 
 *             <EntryDetails
 *             />
 */
export default class EntryDetails extends React.Component<PropsType, OwnStateType> {

  constructor(props: PropsType) {
    super(props);
  }

  private renderEditButton = () => {
    return (this.renderButton('Edit', 'PRIMARY'));
  }

  private renderCancelButton() {
    return (this.renderButton('Cancel', 'INFO'));
  }

  /**
   * Returns a button with text specified
   */
  private renderButton(text: string, color: ButtonColor) {
    const isInfo = color === 'INFO';
    const isPrimary = color === 'PRIMARY';

    return (
      <Col style={Styles.button}>
        <Button block info={isInfo} primary={isPrimary}>
          <Text>{text}</Text>
        </Button>
      </Col>
    );
  }

  private renderHeader() {
    return (
      <Grid>
        <Row style={Styles.headerRow}>
          <H1>
            {/* {this.props.farmer.firstName} {this.props.farmer.lastName} */}
            {fakeValues.firstName} {fakeValues.lastName}
          </H1>
        </Row>
        <Row style={Styles.headerRow}>
          <Text style={Styles.header}>
            {/* @TODO Change this to take date only */}
            {/* {this.props.milkEntry.datetime} */}
            {fakeValues.date}
          </Text>
        </Row>
        <Row style={Styles.headerRow}>
          <Text style={Styles.header}>
            {/* @TODO Change this to take time only */}
            {/* {this.props.milkEntry.datetime}  */}
            {fakeValues.time} 
          </Text>
        </Row>
      </Grid>
    );
  }

  private formatRow(label: string, value: string) {
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
          {/* {this.formatRow('Amount (L)', this.props.milkEntry.volume)} */}
          {this.formatRow('Amount (L)', fakeValues.volume)}
        </ListItem>
        <ListItem>
          {/* {this.formatRow('Quality', this.props.milkEntry.quality)} */}
          {this.formatRow('Quality', fakeValues.quality)}
        </ListItem>
        <ListItem>
          {/* {this.formatRow('Rate (UGX)', this.props.milkEntry.costPerUnit)} */}
          {this.formatRow('Rate (UGX)', fakeValues.costPerUnit)}
        </ListItem>
      </List>
    );
  }

  /**
   * Render method for EntryDetails
   */
  public render() {
    return(
      <Content padder style={Styles.content}>
        {this.renderHeader()}
      <Grid>
        {this.renderDetailFields()}
        <Row style={Styles.buttonRow}>
          {this.renderEditButton()}
        </Row>
      </Grid>
    </Content>
    );
  }
}
