import * as React from 'react';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import { Tabs as NativeTabs, Text } from 'native-base';

import { Tab, TabMap, ElementTab, ElementTabMap, StoreTabMap } from '../../../store/modules/tabs/types';
import tabActions from '../../../store/modules/tabs/actions';
import { State } from '../../../store/types';

export interface OwnProps {}

interface StoreProps {
  activeTab: string;
}

interface DispatchProps {
  setTabs: (tabs: ElementTabMap, activeTab: ElementTab) => void;
  setActiveTab: (activeTab: ElementTab) => void;
}

export interface OwnState {}

type Props = OwnProps & StoreProps & DispatchProps;

/**
 * Superclass for tab navigator pages
 */
export default abstract class TabNavigator extends React.Component<Props, OwnState> {

  /************************* Member Variables ************************/
  protected tabs: ElementTabMap;

  /************************* Member Functions ************************/

  constructor(props: Props, tabs: ElementTabMap) {
    super(props);

    this.tabs = tabs;
  }

  protected getActiveTab() {
    return Object.keys(this.tabs)
      .map(k => this.tabs[k])
      .filter(t => t.name === this.props.activeTab);
  }

  /************************* React Lifecycle *************************/

  public render(): JSX.Element {
    return (
      <Text />
    );
  }

  /************************* Static Functions ************************/

  private static toTabs(tabMap: TabMap<ElementTab>): TabMap<Tab> {
    const {
      element,
      ...rest,
    } = tabMap;

    return rest;
  }

  private mapStateToProps: MapStateToProps<StoreProps, OwnProps, State> = (state, ownProps) => {
    return {
      activeTab: state.tabs.activeTab.name,
    };
  }

  private mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch) => {
    return {
      setActiveTab: tab => dispatch(tabActions.setActiveTab(tab)),
      setTabs: (tabs, activeTab) => dispatch(tabActions.setTabs(TabNavigator.toTabs(tabs), activeTab)),
    };
  }
}

/******************************* Redux *******************************/


