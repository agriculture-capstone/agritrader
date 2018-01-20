/*----------------------- State -----------------------*/

export interface SearchBarState {
  shown: boolean;
  value: string;
  placeholder: string;
}

/*----------------------- Actions -----------------------*/

export type Action = {
  type: 'SHOW_SEARCH_BAR',
  placeholder: string,
} | {
  type: 'SET_SEARCH_BAR_VALUE',
  value: string,
} | {
  type: 'REMOVE_SEARCH_BAR',
} | {
  type: 'CLEAR_SEARCH_VALUE',
};
