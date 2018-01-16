import { Action } from './types';
import { Actions } from '../../types';

// TODO: Convert to normal
function createAppActions(): Actions<Action> {
  return {
    setDrawerShown: (shown: boolean): Action => ({
      shown,
      type: 'SET_DRAWER_SHOWN',
    }),

    toggleDrawerShown: (): Action => ({
      type: 'TOGGLE_DRAWER_SHOWN',
    }),

    setDrawerLocked: (locked: boolean) => ({
      locked,
      type: 'SET_DRAWER_LOCKED',
    }),

    setTitle: (title: string): Action => ({
      title,
      type: 'SET_TITLE',
    }),
  };
}

export default createAppActions;
