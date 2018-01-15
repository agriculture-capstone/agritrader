import * as React from 'react';

import { Spinner } from 'native-base';

/** FakePage props */
export interface Props {}

/** FakePage state */
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

  /** React render method */
  public render(): JSX.Element {
    return (
      <Spinner color="red" />
    );
  }

  /************************* Static Functions ************************/
}
