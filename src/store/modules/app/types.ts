import appState from './state';

/*----------------------- State -----------------------*/
export type AppState = typeof appState;

/*----------------------- Actions -----------------------*/
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
