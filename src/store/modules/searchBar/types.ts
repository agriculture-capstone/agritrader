/*----------------------- State -----------------------*/

export interface SearchBarState {
  shown: boolean;
  value: string;
}

/*----------------------- Actions -----------------------*/

export type Action = {
  type: 'SHOW_SEARCH_BAR',
} | {
  type: 'SET_SEARCH_BAR_VALUE',
  value: string,
} | {
  type: 'HIDE_SEARCH_BAR',
};
