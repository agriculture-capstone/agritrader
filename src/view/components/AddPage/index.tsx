import * as React from 'react';
import { Content, View, List, ListItem, Text, Grid, Row, Col, H2, H3, Button, Input, Item, Label } from 'native-base';

import Styles from './style';

interface OwnPropsType {
  values: any;
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
 * Component for AddPage
 * @param values = {label: 'lableName', value: 'valueName'}
 */
export default class AddPage extends React.Component<PropsType, OwnStateType> {

  constructor(props: PropsType) {
    super(props);
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
            <Item inlineLabel>
              <Label>{item.label}</Label>
              <Input />
            </Item>
          </Col>
        </Grid>
      </ListItem>
    );
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

  /**
   * Render method for AddPage
   */
  public render() {
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
