import * as React from 'react';
import { Content, View, List, ListItem, Text, Grid, Row, Col, H1, H2, H3, Button, Input, Item, Label } from 'native-base';

import Styles from './style';

interface OwnPropsType {
  values: {
    firstName: string;
    lastName: string;
    date: string;
    entryDetails: any[];
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
 * @param values = {label: 'lableName', value: 'valueName'}
 * @param mode = 'DETAILS' | 'EDIT'
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
          <H1>
            {this.props.values.date}
          </H1>
        </Row>
      </Grid>
    );
  }

  private renderDetailRow(item: any) {
    return (
      <ListItem>
        <Grid>
          <Col>
            <H3>
              {item.label}
            </H3>
          </Col>
          <Col>
            <H3>
              {item.value}
            </H3>
          </Col>
        </Grid>
      </ListItem>
    );
  }

  private renderEditRow(item: any) {
    return (
      <ListItem>
        <Grid>
          <Col>
            <H3>
              {item.label}
            </H3>
          </Col>
          <Col>
            <Input
              placeholder={item.value}
            />
          </Col>
        </Grid>
      </ListItem>
    );
  }

  /**
   * Render method for EntryDetails
   */
  public render() {
    switch (this.props.mode) {
      case 'DETAILS': {
        return(
          <Content padder>
            {this.renderHeader()}
            <List
              dataArray={this.props.values.entryDetails}
              renderRow={this.renderDetailRow}
            />
            <Grid>
              <Row>
                {this.renderEditButton()}
              </Row>
            </Grid>
          </Content>
        );
      }
      case 'EDIT': {
        return(
          <Content padder>
            {this.renderHeader()}
            <List
              dataArray={this.props.values.entryDetails}
              renderRow={this.renderEditRow}
            />
            <Grid>
              <Row>
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
