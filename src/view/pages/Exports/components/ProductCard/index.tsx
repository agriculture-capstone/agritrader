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


const PRODUCT_CARD_HEADERS = ['Date/Time', 'Licence Plate #', 'Volume (L)'];

/**
* Container for Product Card
*/
export default class ProductCard extends React.Component<PropsType, OwnStateType> {

  private onEntryPress = (uuid: string) => {
    return () => {
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
        onEntryPress={this.onEntryPress}
      />
    );
  }
}
