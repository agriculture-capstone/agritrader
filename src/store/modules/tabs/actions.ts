import { Action, Tab, TabList, StoreTabMap } from './types';

const tabActions = {

  setTabs: (tabs: StoreTabMap, activeTab: Tab): Action => ({
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
