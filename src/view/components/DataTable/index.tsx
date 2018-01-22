import * as React from 'react';
import { List, ListItem, Text, Grid, Col } from 'native-base';

interface DataTablePropsType {
  headers: Array<string>;
  values: Array<any>;
}
/**
* Container for DataTable
*/
export default class DataTable extends React.Component<DataTablePropsType, {}> {
  
  public renderRow(item: any) {
    const keys = Object.keys(item); 
    return (
            <ListItem>
              <Grid>
                {keys.map((x) => {
                  return (<Col><Text>{item[x]}</Text></Col>);})}
                </Grid>
            </ListItem>
    );
  }


  public renderSectionHeader(sectionData: any, sectionId: any) {
    return (
      <ListItem itemHeader first>
        <Grid>
          {
            this.props.headers.map((x) => { 
              return <Col><Text>{x}</Text></Col>;
            })
          }
        </Grid>
      </ListItem>
    );
  }

  
  /**
  * Render method for DataTable
  */
  public render() {
    return (
      <List 
        dataArray={this.props.values}
        renderRow={this.renderRow}
        renderSectionHeader={this.renderSectionHeader.bind(this)}
        
      />
    );
  }
}