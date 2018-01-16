/*----------------------- Models -----------------------*/

// Basic model for tab data
export interface Tab {
  name: string;
}

/** Specialized tab containing JSX.Element reference */
export interface ElementTab extends Tab {
  element: () => JSX.Element;
}

/** Model for an object containing Tab-like values */
export interface TabList<T extends Tab> extends Array<T> {}

/** Model for tabs data in store */
export type StoreTabMap = TabList<Tab>;

/** Model for TabMap containing elements */
export type ElementTabList = TabList<ElementTab>;

/*----------------------- State -----------------------*/

/** Tab module state */
export interface TabState {
  tabs: StoreTabMap;
  activeTab: Tab | null;
}

/*----------------------- Actions -----------------------*/

/** Tab module action */
export type Action = {
  type: 'SET_TABS',
  activeTab: Tab,
  tabs: StoreTabMap,
} | {
  type: 'CLEAR_TABS',
} | {
  type: 'SET_ACTIVE_TAB',
  activeTab: Tab,
};
