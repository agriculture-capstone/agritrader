import * as React from 'react';
import { Provider } from 'react-redux';

import { Container, Header, Content, List, ListItem, Text, Grid, Row, Col } from 'native-base';
import DataTable from '../DataTable';

/**
* Container for Product Card
*/
export default class ProductCard extends React.Component<{}, {}> {
  /**
  * Render method for Product Card
  */
  public render() {
    var headers = ['Date','AM', 'PM'];
    var values = [{date:'Jan 1', am: 2, pm:2}, {date:'Jan 1', am: 2, pm:2}];
    
    return (
      <DataTable
        headers={headers} 
        values={values} 
       />
    );
  }
}
