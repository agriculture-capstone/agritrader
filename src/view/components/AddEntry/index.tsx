import * as React from 'react';
import { Content, List, ListItem, Text, Grid, Row, Col, H1, Button, Input, Form, Item, Label } from 'native-base';

import { Farmer } from '../../../store/modules/farmer/types';
import { Dairy as MilkEntry } from '../../../store/modules/dairy/types';

import Composer from '../../hoc/PageComposer';
import Styles from './style';

// @TODO delete this
const fakeValues = {
  firstName: 'Patrick',
  lastName: 'Kenaan',
  date: 'Friday, Jan 25, 2018',
  time: '9:35 pm',
};

interface values {
  farmer: Farmer;
}

// @TODO uncomment props
interface OwnPropsType {
  // farmer: Farmer;
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
 * Component for AddEntry
 * @requires values
 * 
 * @example 
 *             <AddEntry
 *             />
 */

export default class AddEntry extends React.Component<PropsType, OwnStateType> {

  constructor(props: PropsType) {
    super(props);
  }

  private renderCancelButton() {
    return (this.renderButton('Cancel', 'INFO'));
  }

  private renderSaveButton() {
    return (this.renderButton('Save', 'PRIMARY'));
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
            {/* {this.props.farmer.datetime} */}
            {fakeValues.date}
          </Text>
        </Row>
        <Row style={Styles.headerRow}>
          <Text style={Styles.header}>
            {/* @TODO Change this to take time only */}
            {/* {this.props.farmer.datetime} */}
            {fakeValues.time}
          </Text>
        </Row>
      </Grid>
    );
  }

  private renderFields() {
    return (
      <Form>
      <Item floatingLabel>
        <Label>Amount (L)</Label>
        <Input />
      </Item>
      <Item floatingLabel>
        <Label>Quality</Label>
        <Input />
      </Item>
      <Item floatingLabel last>
        <Label>Rate (UGX)</Label>
        <Input />
      </Item>
    </Form>
    );
  }

  /**
   * Render method for AddEntry
   */
  public render() {
    return(
      <Content padder style={Styles.content}>
        <List>
          <ListItem>
            {this.renderHeader()}
          </ListItem>
        </List>
        {this.renderFields()}
        <Grid>
          <Row style={Styles.buttonRow}>
            {this.renderCancelButton()}
            {this.renderSaveButton()}
          </Row>
        </Grid>
      </Content>
    );
  }
}
