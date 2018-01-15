import * as React from 'react';
import { Provider } from 'react-redux';

import { Container, Header, Content, List, ListItem, Text, Grid, Row, Col } from 'native-base';
import DataTable from '../DataTable';

/**
* Container for application
*/
export default class ProductCard extends React.Component<{}, {}> {
  /**
  * Render method for App
  */
  public render() {
    var headers = ['Date','AM', 'PM'];
    //var values = [{date:'Jan 1', am: 2, pm:2}];
    var values = [{date:'Jan 1', am: 2, pm:2}, {date:'Jan 1', am: 2, pm:2}];
    // const values = ['hello', 'hi'];
    return (
      <DataTable
        headers={headers} 
        values={values} 
       />
    );
  }
}
