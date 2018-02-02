import * as React from 'react';
import { List, ListItem, Text, Grid, Col, Card } from 'native-base';
import * as moment from 'moment';

import styles from './style';
import { Route } from '../../navigation/navigator';


interface OwnPropsType {
  headers: string[];
  values: any[];
  routed?: RoutedPropsType;
  onEntryPress(uuid: string): any;
}

/** Interface for clickable list item support */
interface RoutedPropsType {
  route: Route;
  onPress(route: Route): void;
}

interface DispatchPropsType {

}

interface StorePropsType {

}

type PropsType = OwnPropsType & DispatchPropsType & StorePropsType;

interface OwnStateType {

}

/**
* Component for DataTable
*/
export default class DataTable extends React.Component<PropsType, OwnStateType> {
  constructor(props: PropsType) {
    super(props);
    this.renderSectionHeader = this.renderSectionHeader.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  /**
   * All array items will be written to the table in the order passed
   * with the exception of the last element which is expected to be the uuid
   * @param values
   */
  private formatTableValues(values: any[]) {
    return values.map((value, index) => {
      if (index === values.length - 1) {
        return;
      } else {
        return (
          <Col key={moment().format() + index} style={{ justifyContent: 'center' }}>
            <Text style={styles.values}>
              {value}
            </Text>
          </Col>
        );
      }
    });
  }

  private formatHeaderValues(values: any[]) {
    return values.map((value, index) => {
      return (
        <Col key={moment().format() + index} style={{ justifyContent: 'center' }}>
          <Text style={styles.values}>
            {value}
          </Text>
        </Col>
      );
    });
  }

  private renderRow(item: any) {
    return (
      <ListItem style={{ justifyContent: 'center' }} button={true} onPress={this.props.onEntryPress(item.uuid)}>
        <Grid style={{ justifyContent: 'center' }}>
          {this.formatTableValues(Object.values(item))}
        </Grid>
      </ListItem>
    );
  }

  private renderSectionHeader() {
    return (
      <ListItem itemHeader first>
        <Grid>
          {this.formatHeaderValues(this.props.headers)}
        </Grid>
      </ListItem>
    );
  }

  /**
  * Render method for DataTable
  */
  public render() {
    return (
      <Card>
        <List
          dataArray={this.props.values}
          renderRow={this.renderRow}
          renderSectionHeader={this.renderSectionHeader}
        />
      </Card>
    );
  }
}
