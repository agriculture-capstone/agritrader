import * as React from 'react';
import { connect, MapStateToProps, MapDispatchToProps, DispatchProp } from 'react-redux';
import { Text, Tab as NativeTab, Tabs as NativeTabs } from 'native-base';

import { Tab, TabList, ElementTab, ElementTabList, StoreTabList } from '../../../store/modules/tabs/types';
import tabsActions from '../../../store/modules/tabs/actions';
import searchBarActions from '../../../store/modules/searchBar/actions';
import { State } from '../../../store/types';

/** TabManager OwnProps */
interface OwnProps {}

interface StoreProps {
  activeTab: string;
}

interface DispatchProps extends DispatchProp<State> {
  setTabs(tabs: ElementTabList, activeTab: ElementTab): void;
  setActiveTab(activeTab: ElementTab): void;
  clearTabs(): void;
  clearSearchValue(): void;
}

interface OwnState {}

/** TabManager props */
export type Props = OwnProps & StoreProps & DispatchProps;


function wrapTabs(tabs: ElementTabList) {

  /**
  * TabManager HOC
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

      // Bindings
      this.onChangeTab = this.onChangeTab.bind(this);

      // Initialization
      this.tabs = tabs;
    }

    private onChangeTab(i: number) {
      this.props.setActiveTab(this.tabs[i]);
      this.props.clearSearchValue();
    }

    private createTab(tab: ElementTab) {
      return <NativeTab heading={tab.name} key={tab.name} >{tab.element()}</NativeTab>;
    }

    private getActiveElement() {
      const tab = (this.props.activeTab) ? this.tabs.find(t => t.name === this.props.activeTab) : this.tabs[0];
      if (!tab) throw new Error('Active tab is not a valid tab');

      return tab.element();
    }

    /************************* React Lifecycle *************************/

    /** React componentDidMount */
    public componentDidMount() {
      this.props.setTabs(this.tabs, this.tabs[0]);
    }

    /** React componentWillUnmount */
    public componentWillUnmount() {
      this.props.clearTabs();
    }

    /** React render */
    public render(): JSX.Element {
      return (
        <NativeTabs onChangeTab={this.onChangeTab}>
          {this.tabs.map(this.createTab)}
        </NativeTabs>
      );
    }

  };
}
/******************************* Redux *******************************/

/**
 * Convert ElementTabList to TabList as new array
 *
 * @param {ElementTabList} [tabList] array to convert
 * @returns {StoreTabList} converted array
 */
export function toTabs(tabList: ElementTabList): StoreTabList {
  return tabList.map(toTab);
}

/**
 * Convert ElementTab to Tab as new object
 *
 * @param {ElementTab} [tab] Tab to convert
 * @returns {Tab} converted tab
*/
export function toTab(tab: ElementTab): Tab {
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
    setActiveTab: tab => dispatch(tabsActions.setActiveTab(tab)),
    setTabs: (tabs, activeTab) => dispatch(tabsActions.setTabs(toTabs(tabs))),
    clearTabs: () => dispatch(tabsActions.clearTabs()),
    clearSearchValue: () => dispatch(searchBarActions.clearSearchValue()),
  };
};

/**
 * Create a tabbed page that renders different contents depending on the active tab
 *
 * The first tab in the 'tabs' list will be rendered on the far left, and the last
 * will be rendered on the far right.
 *
 * @param {ElementTabList} [tabs]
 *
 * @example
 *
  export default createTabManager(
    [
      {
        name: 'Collect',
        element: () => <Collect />,
      },
      {
        name: 'Loan',
        element: () => <Loan />,
      },
      {
        name: 'Buy',
        element: () => <Buy />,
      },
      {
        name: 'Info',
        element: () => <Info />,
      },
    ],
  );
 */
export default function createTabManager(tabs: ElementTabList) {
  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(wrapTabs(tabs));
}
