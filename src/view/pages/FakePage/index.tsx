import * as React from 'react';

import { Spinner } from 'native-base';
import createTabManager from '../../components/TabManager/index';
import { ElementTabList } from '../../../store/modules/tabs/types';

/** FakePage props */
export interface Props {}

/** FakePage state */
export interface State {}

const fakeTabs: ElementTabList = [
  {
    element: () => <SpinnerPage />,
    name: 'Test',
  },
  {
    element: () => <SpinnerPage />,
    name: 'Hello',
  },
];

export const FakePage = createTabManager(fakeTabs);

/**
 * TODO: Documentation
 */
export class SpinnerPage extends React.Component<Props, State> {

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
