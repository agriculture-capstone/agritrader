import * as React from 'react';
import { Content, View, List, ListItem, Text, Grid, Row, Col, H2, H3, Button } from 'native-base';

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

  private renderDetailsButton() {
    return (
      <Grid>
        <Row>
          <Col>
            <Button block primary>
              <Text>Edit</Text>
            </Button>
          </Col>
        </Row>
      </Grid>
    );
  }

  private renderEditButton() {
    return (
      <Grid>
        <Row>
          <Col style={Styles.button}>
            <Button block info>
              <Text>Cancel</Text>
            </Button>
          </Col>
          <Col style={Styles.button}>
            <Button block primary>
              <Text>Save</Text>
            </Button>
          </Col>
        </Row>
      </Grid>
    );
  }

  private renderAddButton() {
    return (
      <Grid>
        <Row>
          <Col style={Styles.button}>
            <Button block info>
              <Text>Cancel</Text>
            </Button>
          </Col>
          <Col style={Styles.button}>
            <Button block primary>
              <Text>Add</Text>
            </Button>
          </Col>
        </Row>
      </Grid>
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
            {this.renderDetailsButton()}
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
            {this.renderEditButton()}
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
            {this.renderAddButton()}
          </Content>
        );
      }
    }
  }
}
