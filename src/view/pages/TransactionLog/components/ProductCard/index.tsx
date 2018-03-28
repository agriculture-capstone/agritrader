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


const PRODUCT_CARD_HEADERS = ['Date/Time', 'Type', 'Amount'];

/**
* Container for Product Card
*/
export default class ProductCard extends React.Component<PropsType, OwnStateType> {

  private onPressEntry = (uuid: string) => {
    return () => {
      // this is an example from the milk collect page
      // this.props.setActiveMilkEntry(uuid);
      // this.props.navigateToMilkEntry();
    };
  }
  /**
  * Render method for Product Card
  */
  public render() {
    return (
      <DataTable
        headers={PRODUCT_CARD_HEADERS}
        values={this.props.values}
        onPressEntry={this.onPressEntry}
      />
    );
  }
}
