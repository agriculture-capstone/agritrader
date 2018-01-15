import * as React from 'react';

import { Spinner } from 'native-base';

import { MutableList } from '../../components/MutableList';

export interface Props {}

export interface State {}

/**
 * TODO: Documentation
 */
export class FakePage extends React.Component<Props, State> {

  /************************* Member Variables ************************/

  /************************* Member Functions ************************/

  constructor(props: Props) {
    super(props);
  }

  /************************* React Lifecycle *************************/

  public render(): JSX.Element {
    return (
      <MutableList
        listData={[{ mainTitle:'Nick', secondTitle:'1234', id:1 },{ mainTitle:'John', secondTitle:'1234', id:2 }]}
        displayRowFunc={{}}
      />
    );
  }

  /************************* Static Functions ************************/
}
