import { Action, Tab, TabMap } from './types';
import { Actions } from '../../types';

function createTabActions<T extends TabMap>(): Actions<Action<T>> {
  return {
    setTabs: (tabs: T, activeTab: Tab) => ({
      tabs,
      activeTab,
      type: 'SET_TABS',
    }),

    clearTabs: () => ({
      type: 'CLEAR_TABS',
    }),

    setActiveTab: (activeTab: Tab) => ({
      activeTab,
      type: 'SET_ACTIVE_TAB',
    }),
  };
}

export default createTabActions;
