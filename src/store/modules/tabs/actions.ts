import { Action, Tab, TabList, StoreTabList } from './types';

const tabsActions = {

  setTabs: (tabs: StoreTabList): Action => ({
    tabs,
    type: 'SET_TABS',
  }),

  clearTabs: (): Action => ({
    type: 'CLEAR_TABS',
  }),

  setActiveTab: (activeTab: Tab): Action => ({
    activeTab,
    type: 'SET_ACTIVE_TAB',
  }),
};

export default tabsActions;
