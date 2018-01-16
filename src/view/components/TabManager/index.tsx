import * as React from 'react';
import { connect, MapStateToProps, MapDispatchToProps, DispatchProp } from 'react-redux';
import { Tabs as NativeTabs, Text } from 'native-base';

import { Tab, TabList, ElementTab, ElementTabList, StoreTabMap } from '../../../store/modules/tabs/types';
import tabActions from '../../../store/modules/tabs/actions';
import { State } from '../../../store/types';

/** TabManager OwnProps */
interface OwnProps {}

interface StoreProps {
  activeTab: string;
}

interface DispatchProps extends DispatchProp<State> {
  setTabs: (tabs: ElementTabList, activeTab: ElementTab) => void;
  setActiveTab: (activeTab: ElementTab) => void;
}

export interface OwnState {}

/** TabManager props */
export type Props = OwnProps & StoreProps & DispatchProps;

function createSimpleComponent(tabs: ElementTabList) {

  /**
  * Page that renders different component depending on which tab the user is on
  *
  * Should not be instantiated directly, only extended. Unable to mark abstract due to react-redux
  */
  return class TabManager extends React.Component<Props, OwnState> {

    /************************* Member Variables ************************/
    private tabs: ElementTabList;

    /************************* Member Functions ************************/

    constructor(props: Props) {
      super(props);

      // Validation
      if (!tabs.length) {
        throw new Error('Cannot create TabNavigator with no tabs');
      }

      this.tabs = tabs;
    }

    private getActiveElement() {
      const tab = this.tabs.find(t => t.name === this.props.activeTab);
      if (!tab) throw new Error('Active tab is not a valid tab');

      return tab.element();
    }

    /************************* React Lifecycle *************************/

    public componentDidMount() {
      this.props.setTabs(this.tabs, this.tabs[0]);
    }

    public render(): JSX.Element {
      return this.getActiveElement();
    }

  };
}
/******************************* Redux *******************************/

function toTabs(tabList: TabList<ElementTab>): TabList<Tab> {
  return tabList.map(toTab);
}

function toTab(tab: ElementTab): Tab {
  const {
    element,
    ...rest,
  } = tab;

  return rest;
}

const mapStateToProps: MapStateToProps<StoreProps, OwnProps, State> = (state, ownProps) => {
  return {
    activeTab: (state.tabs.activeTab) ? state.tabs.activeTab.name : '',
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch) => {
  return {
    setActiveTab: tab => dispatch(tabActions.setActiveTab(tab)),
    setTabs: (tabs, activeTab) => dispatch(tabActions.setTabs(toTabs(tabs), activeTab)),
  };
};

function createTabManager(tabs: ElementTabList) {
  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(createSimpleComponent(tabs));
}
