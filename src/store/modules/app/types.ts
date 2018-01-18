import appState from './state';

/*----------------------- State -----------------------*/

/** Application module state */
export type AppState = typeof appState;

/*----------------------- Actions -----------------------*/

/** Application module action */
export type Action = {
  type: 'SET_DRAWER_SHOWN',
  shown: boolean,
} | {
  type: 'TOGGLE_DRAWER_SHOWN',
} | {
  type: 'SET_DRAWER_LOCKED',
  locked: boolean,
} | {
  type: 'SET_TITLE',
  title: string,
};
