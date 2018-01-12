import * as React from 'react';
import { Container } from 'native-base';

export interface Props {}

export interface State {}

/**
 * TODO: Documentation
 */
export class Name extends React.Component<Props, State> {

  /************************* Member Variables ************************/

  /************************* Member Functions ************************/

  constructor(props: Props) {
    super(props);
  }

  /************************* React Lifecycle *************************/

  public render(): JSX.Element {
    return (
      <Container />
    );
  }

  /************************* Static Functions ************************/
}
