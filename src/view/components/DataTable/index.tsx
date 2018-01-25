import * as React from 'react';
import { List, ListItem, Text, Grid, Col } from 'native-base';
import { DataTable as OtherDataTable } from 'react-native-data-table';

interface OwnPropsType {
  headers: string[];
  values: any[];
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

  private formatValues(values: any[]) {
    return values.map((value) => {
      return (
        <Col key={value}>
          <Text>
            {value}
          </Text>
        </Col>
      );
    });
  }
  
  private renderRow(item: any) {
    return (
      <ListItem>
        <Grid>
          {this.formatValues(Object.values(item))}
        </Grid>
      </ListItem>
    );
  }

  private renderSectionHeader() {
    return (
      <ListItem itemHeader first>
        <Grid>
          {this.formatValues(this.props.headers)}
        </Grid>
      </ListItem>
    );
  }

  /**
  * Render method for DataTable
  */
  public render() {
    return (
      <OtherDataTable /> 
      
    );
  }
}
