/*----------------------- State -----------------------*/

export interface HeaderState {
  shown: boolean;
  title: string;
}

/*----------------------- Actions -----------------------*/

export type Action = {
  type: 'SET_HEADER_SHOWN',
  shown: boolean,
} | {
  type: 'SET_TITLE',
  title: string,
} | {
  type: 'DEFAULT',
};
