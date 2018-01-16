/*----------------------- Models -----------------------*/

// Basic model for tab data
export interface Tab {
  name: string;
}

/** Specialized tab containing JSX.Element reference */
export interface ElementTab extends Tab {
  component: () => JSX.Element;
}

/** Model for an object containing Tab-like values */
export interface TabMap<T extends Tab> {
  [key: string]: T;
}

/** Model for tabs data in store */
export type StoreTabMap = TabMap<Tab>;

/** Model for TabMap containing elements */
export type ElementTabMap = TabMap<ElementTab>;

/*----------------------- State -----------------------*/

/** Tab module state */
export interface TabState {
  tabs: StoreTabMap;
  activeTab: Tab;
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
