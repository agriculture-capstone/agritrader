import * as React from 'react';
import { Provider } from 'react-redux';

import { Container, Header, Content, List, ListItem, Text, Grid, Row, Col } from 'native-base';

interface DataTablePropsType {
  headers: Array<string>;
  values: Array<any>;
}


/**
* Container for DataTable
*/
export default class DataTable extends React.Component<DataTablePropsType, {}> {
//Render function for data rows
  public renderRow(item: any) {
    const keys = Object.keys(item); 
    return (
            <ListItem style={{ right: 17, width: 360 }}>
              <Grid>
                {keys.map((x) => {
                  return (<Col size={33.33}><Text>{item[x]}</Text></Col>);})}
                </Grid>
            </ListItem>
    );
  }

//Render function for the header
  public renderSectionHeader(sectionData: any, sectionId: any) {
    return (
      <ListItem itemHeader first style={{ right: 17, width: 360 }}>
        <Grid>
          {
            this.props.headers.map((x) => { 
              return <Col size={33.33}><Text style={{fontSize: 15}}>{x}</Text></Col>;
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
