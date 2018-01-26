import * as React from 'react';
import { Content, List, ListItem, Text, Grid, Row, Col, H1, H2, H3, Button, Input, Form, Item, Label } from 'native-base';

import Styles from './style';

interface OwnPropsType {
  values: {
    firstName: string;
    lastName: string;
    date: string;
    time: string;
  };
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
 * @requires values = {
 *                  firstName: string
 *                  lastName: string
 *                  date: string
 *                  time: string
 *           }
 * @returns 
 * AddEntry component with firstName, lastName, date, and time as read-only and Amount (L), Quality, and Rate (UGX) input fields
 * @example 
 *             <AddEntry
 *                values={{
 *                  firstName: 'Patrick',
 *                  lastName: 'Kenaan',
 *                  date: 'Friday, Jan 25, 2018',
 *                  time: '9:35 pm',
 *                }}
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
            {this.props.values.firstName} {this.props.values.lastName}
          </H1>
        </Row>
        <Row style={Styles.headerRow}>
          <Text style={Styles.header}>
            {this.props.values.date}
          </Text>
        </Row>
        <Row style={Styles.headerRow}>
          <Text style={Styles.header}>
            {this.props.values.time}
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
      <Content padder>
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
