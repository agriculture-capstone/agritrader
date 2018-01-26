import * as React from 'react';
import { Content, List, View, ListItem, Text, Grid, Row, Col, Right, H1, H2, H3, Button, Input, Form, Item, Label, Card, CardItem } from 'native-base';

import Styles from './style';

interface OwnPropsType {
  values: {
    firstName: string;
    lastName: string;
    date: string;
    time: string;
    entryDetails: any;
  };
  mode: PageMode;
}

interface DispatchPropsType {
}

interface StorePropsType {
}

type PropsType = OwnPropsType & DispatchPropsType & StorePropsType;

interface OwnStateType {
}

/**
 * Modes to determine how to render EntryDetails component
 */
type PageMode = 'DETAILS' | 'EDIT';

/**
 * Button color
 */
type ButtonColor = 'PRIMARY' | 'INFO';

/**
 * Component for EntryDetails
 * @requires values = {
 *                  firstName: string
 *                  lastName: string
 *                  date: string
 *                  time: string
 *                  entryDetails: {
 *                    amount: 'Amount #'
 *                    quality: 'Quality #'
 *                    rate: 'Rate #'
 *                  }
 *           }
 * @returns 
 * EntryDetails component with firstName, lastName, date, time, Amount (L), Quality, and Rate (UGX) as read-only
 * @example 
 *             <EntryDetails
 *                values={{
 *                  firstName: 'Patrick',
 *                  lastName: 'Kenaan',
 *                  date: 'Friday, Jan 25, 2018',
 *                  time: '9:35 pm',
 *                  entryDetails:
 *                    {
 *                      amount: '14',
 *                      quality: '45',
 *                      rate: '2.75',
 *                    }
 *                }}
 *                mode="DETAILS"
 *             />
 * @prop mode = 'DETAILS' | 'EDIT'
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

  private formatEditRow(label: string, value: string) {
    return (
      <Grid>
        <Row>
          <Col>
            <Text>{label}</Text>
          </Col>
          <Col>
          <Item>
            <Input>
              <Text>{value}</Text>
            </Input>
          </Item>
          </Col>
        </Row>
      </Grid>
    );
  }

  private renderDetailFields() {
    return (
      <List>
        <ListItem>
          {this.formatRow('Amount (L)', this.props.values.entryDetails.amount)}
        </ListItem>
        <ListItem>
          {this.formatRow('Quality', this.props.values.entryDetails.quality)}
        </ListItem>
        <ListItem>
          {this.formatRow('Rate (UGX)', this.props.values.entryDetails.rate)}
        </ListItem>
      </List>
    );
  }

  private renderEditFields() {
    return (
      <View style={{ padding: 15, }}>
        {this.formatEditRow('Amount (L)', this.props.values.entryDetails.amount)}
        {this.formatEditRow('Quality', this.props.values.entryDetails.quality)}
        {this.formatEditRow('Rate (UGX)', this.props.values.entryDetails.rate)}
      </View>
    );
  }

  /**
   * Render method for EntryDetails
   */
  public render() {
    switch (this.props.mode) {
      case 'DETAILS': {
        return(
          <Content padder style={{ backgroundColor: 'white' }}>
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
      case 'EDIT': {
        return(
          <Content padder style={{ backgroundColor: 'white' }}>
          <List>
            <ListItem>
              {this.renderHeader()}
            </ListItem>
          </List>
          {this.renderEditFields()}
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
  }
}
