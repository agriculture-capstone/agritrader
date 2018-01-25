import * as React from 'react';
import { Content, View, List, ListItem, Text, Grid, Row, Col, H2, H3, Button, Input, Item, Label } from 'native-base';

import Styles from './style';

interface OwnPropsType {
  values: any;
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
 * Modes to determine how to render DetailsPage component
 */
type PageMode = 'details' | 'edit' | 'add';

/**
 * Button types
 */
type ButtonType = 'Add' | 'Edit' | 'Cancel';

/**
 * Button color
 */
type ButtonColor = 'primary' | 'info';

/**
 * Component for DetailsPage
 * @param values = {label: 'lableName', value: 'valueName'}
 * @param mode = 'details' | 'edit' | 'add'
 */
export default class DetailsPage extends React.Component<PropsType, OwnStateType> {

  constructor(props: PropsType) {
    super(props);
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
            <H3>
              {item.value}
            </H3>
          </Col>
        </Grid>
      </ListItem>
    );
  }

  private renderAddRow(item: any) {
    return (
      <ListItem>
        <Grid>
          <Col>
          <Item floatingLabel>
            <Label>{item.label}</Label>
            <Input />
          </Item>
          </Col>
        </Grid>
      </ListItem>
    );
  }

  private renderEditButton() {
    return (this.renderButton('Edit', 'primary'));
  }

  private renderCancelButton() {
    return (this.renderButton('Cancel', 'info'));
  }

  private renderSaveButton() {
    return (this.renderButton('Save', 'primary'));
  }

  /**
   * Returns a button with text specified
   */
  private renderButton(text: string, color: ButtonColor) {
    const isInfo = color === 'info';
    const isPrimary = color === 'primary';

    return (
      <Col style={Styles.button}>
        <Button block info={isInfo} primary={isPrimary}>
          <Text>{text}</Text>
        </Button>
      </Col>
    );
  }

  /**
   * Render method for DetailsPage
   */
  public render() {
    switch (this.props.mode) {
      case 'details': {
        return(
          <Content padder>
            <List
              dataArray={this.props.values}
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
      case 'edit': {
        return(
          <Content padder>
            <List
              dataArray={this.props.values}
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
      case 'add': {
        return(
          <Content padder>
            <List
              dataArray={this.props.values}
              renderRow={this.renderAddRow}
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
