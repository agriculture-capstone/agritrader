import * as React from 'react';
import { connect, MapStateToProps, MapDispatchToProps, DispatchProp } from 'react-redux';
import { Text, Tab as NativeTab, Tabs as NativeTabs } from 'native-base';

import { Tab, TabList, ElementTab, ElementTabList, StoreTabList } from '../../../store/modules/tabs/types';
import tabsActions from '../../../store/modules/tabs/actions';
import searchBarActions from '../../../store/modules/searchBar/actions';
import { State } from '../../../store/types';

/** TabManager OwnPropsType */
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

/** Convert ElementTabList to TabList */
export function toTabs(tabList: ElementTabList): StoreTabList {
  return tabList.map(toTab);
}

/** Convert ElementTab to Tab */
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
 * Create a React Component class to manage the navigation between provided tabs
 *
 * The first tab in the 'tabs' list will be rendered on the far left, and the last
 * will be rendered on the far right.
 *
 * @example
 * const ExampleTabManager = createTabManager(exampleTabs);
 * export default ExampleTabManager
 *
 * @param {ElementTabList} [tabs] The tabs this component should render
 * @returns {React.ComponentClass}
 */
export default function createTabManager(tabs: ElementTabList) {
  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(createSimpleComponent(tabs));
}
