import { Action, Tab, TabList, StoreTabList } from './types';

const tabActions = {

  setTabs: (tabs: StoreTabList, activeTab: Tab): Action => ({
    tabs,
    activeTab,
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

export default tabActions;
