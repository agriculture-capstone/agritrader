import * as React from 'react';
import { Card } from 'native-base';
import DataTable from '../../../../components/DataTable';

interface OwnPropsType {
  values: any[];
}

interface DispatchPropsType {
}

interface StorePropsType {
}

type PropsType = OwnPropsType & DispatchPropsType & StorePropsType;

interface OwnStateType {
}


const PRODUCT_CARD_HEADERS = ['Date', 'AM', 'PM'];

/**
* Container for Product Card
*/
export default class ProductCard extends React.Component<PropsType, OwnStateType> {
  /**
  * Render method for Product Card
  */
  public render() {
    return (
      <Card>
      <DataTable
        headers={PRODUCT_CARD_HEADERS}
        values={this.props.values}
      />
      </Card>
    );
  }
}
