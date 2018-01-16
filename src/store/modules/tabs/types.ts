/*----------------------- Models -----------------------*/

export interface Tab {
  name: string;
}

export interface ElementTab extends Tab {
  component: () => JSX.Element;
}

export interface TabMap<T extends Tab> {
  [key: string]: T;
}

/*----------------------- State -----------------------*/

/** Tab module state */
export interface TabState {
  tabs: Tab[];
  activeTab: Tab;
}

/*----------------------- Actions -----------------------*/

/** Tab module action */
// FIXME: The type is not currently strict for activeTab
export type Action<T extends TabMap<Tab>> = {
  type: 'SET_TABS',
  activeTab: Tab,
  tabs: T,
} | {
  type: 'CLEAR_TABS',
} | {
  type: 'SET_ACTIVE_TAB',
  activeTab: Tab,
};

interface MyTabMap extends TabMap {
  test: Tab;
}
