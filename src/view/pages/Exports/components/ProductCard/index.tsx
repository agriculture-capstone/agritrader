import * as React from 'react';
import { Provider } from 'react-redux';

import { Container, Header, Content, List, ListItem, Text, Grid, Row, Col } from 'native-base';
import DataTable from '../../../../components/DataTable';

interface ProductCardPropsType {
  values: Array<any>;
}

const PRODUCT_CARD_HEADERS = ['Date', 'Licence Plate', 'Volume'];

/**
* Container for Product Card
*/
export default class ProductCard extends React.Component<ProductCardPropsType, {}> {
  // TODO connect this to redux state

  /**
  * Render method for Product Card
  */
  public render() {
    return (
      <DataTable
        headers={PRODUCT_CARD_HEADERS}
        values={this.props.values}
      />
    );
  }
}
