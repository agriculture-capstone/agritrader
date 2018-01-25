import { Action } from './types';

const drawerActions = {
  setDrawerShown: (shown: boolean): Action => ({
    shown,
    type: 'SET_DRAWER_SHOWN',
  }),

  toggleDrawerShown: (): Action => ({
    type: 'TOGGLE_DRAWER_SHOWN',
  }),

  setDrawerLocked: (locked: boolean): Action => ({
    locked,
    type: 'SET_DRAWER_LOCKED',
  }),
};

export default drawerActions;
