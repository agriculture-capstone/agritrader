import * as React from 'react';
import { Tab, ElementTab, TabMap } from '../../../store/modules/tabs/types';

export interface Props {}

export interface State {}

/**
 * Superclass for tab navigator pages
 */
export abstract class TabNavigator<T extends TabMap<ElementTab>> extends React.Component<Props, State> {

  /************************* Member Variables ************************/

  /************************* Member Functions ************************/

  constructor(props: Props) {
    super(props);
  }

  /************************* React Lifecycle *************************/

  public render(): JSX.Element {
    return (

    );
  }

  /************************* Static Functions ************************/

  private static toTabs(tabMap: TabMap<ElementTab>): TabMap<Tab> {

  }
}
