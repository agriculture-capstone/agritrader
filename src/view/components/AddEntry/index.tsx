import * as React from 'react';
import { Content, List, ListItem, Text, Grid, Row, Col, H1, H3, Button, Input } from 'native-base';

import Styles from './style';

interface OwnPropsType {
  values: {
    firstName: string;
    lastName: string;
    date: string;
    labels: string[];
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
 * @param values = {
 *                  firstName: string;
 *                  lastName: string;
 *                  date: string;
 *                  labels: string[];
 *                 }
 */
export default class AddEntry extends React.Component<PropsType, OwnStateType> {

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

  private renderAddRow(item: any) {
    return (
      <ListItem>
        <Grid>
          <Col>
            <H3>
              {item}
            </H3>
          </Col>
          <Col>
            <Input
              placeholder={'Enter ' + item + ' here'}
            />
          </Col>
        </Grid>
      </ListItem>
    );
  }

  /**
   * Render method for AddEntry
   */
  public render() {
    return(
      <Content padder>
        {this.renderHeader()}
        <List
          dataArray={this.props.values.labels}
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
