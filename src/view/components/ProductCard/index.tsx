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
    return (
      <DataTable />
    );
  }
}
