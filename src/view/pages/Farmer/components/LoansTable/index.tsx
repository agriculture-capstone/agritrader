import * as React from 'react';
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


const PRODUCT_CARD_HEADERS = ['Date', 'Remaining Balance', 'Weekly Payment'];

/**
* Component for Loans Table
*/
export default class LoansTable extends React.Component<PropsType, OwnStateType> {
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
