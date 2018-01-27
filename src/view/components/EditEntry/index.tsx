import * as React from 'react';
import { Content, List, View, ListItem, Text, Grid, Row, Col, H1, Button, Input, Item } from 'native-base';

import { Farmer } from '../../../store/modules/farmer/types';
import { Dairy as MilkEntry } from '../../../store/modules/dairy/types';

import Styles from './style';

interface OwnPropsType {
  farmer: Farmer;
  milkEntry: MilkEntry;
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
 * Page for EditEntry
 * @requires values = {
 *                  firstName: string
 *                  lastName: string
 *                  date: string
 *                  time: string
 *                  EditEntry: {
 *                    amount: 'Amount #'
 *                    quality: 'Quality #'
 *                    rate: 'Rate #'
 *                  }
 *           }
 * 
 * @returns 
 * EditEntry page with firstName, lastName, date, time, Amount (L), Quality, and Rate (UGX) as read-only
 * 
 * @example 
 *             <EditEntry
 *             />
 */
export default class EditEntry extends React.Component<PropsType, OwnStateType> {

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
            {this.props.farmer.firstName} {this.props.farmer.lastName}
          </H1>
        </Row>
        <Row style={Styles.headerRow}>
          <Text style={Styles.header}>
            {/* @TODO Change this to take date only */}
            {this.props.milkEntry.datetime}
          </Text>
        </Row>
        <Row style={Styles.headerRow}>
          <Text style={Styles.header}>
            {/* @TODO Change this to take time only */}
            {this.props.milkEntry.datetime} 
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
          {this.formatRow('Amount (L)', this.props.milkEntry.volume)}
        </ListItem>
        <ListItem>
          {this.formatRow('Quality', this.props.milkEntry.quality)}
        </ListItem>
        <ListItem>
          {this.formatRow('Rate (UGX)', this.props.milkEntry.costPerUnit)}
        </ListItem>
      </List>
    );
  }

  private renderEditFields() {
    return (
      <View style={Styles.editView}>
        {this.formatEditRow('Amount (L)', this.props.values.EditEntry.amount)}
        {this.formatEditRow('Quality', this.props.values.EditEntry.quality)}
        {this.formatEditRow('Rate (UGX)', this.props.values.EditEntry.rate)}
      </View>
    );
  }

  /**
   * Render method for EditEntry
   */
  public render() {
    switch (this.props.mode) {
      case 'DETAILS': {
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
