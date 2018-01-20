import initialState from './state';

/*----------------------- State -----------------------*/

/** Application module state */
export type DrawerState = typeof initialState;

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
};
