/*----------------------- State -----------------------*/

/** State for header module */
export interface HeaderState {
  shown: boolean;
  title: string;
}

/*----------------------- Actions -----------------------*/

/** Action type for header module */
export type Action = {
  type: 'SET_HEADER_SHOWN',
  shown: boolean,
} | {
  type: 'SET_TITLE',
  title: string,
} | {
  type: 'DEFAULT',
};
