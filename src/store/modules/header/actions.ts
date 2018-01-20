import { Action } from './types';

const headerActions = {

  setHeaderShown(shown: boolean): Action {
    return {
      shown,
      type: 'SET_HEADER_SHOWN',
    };
  },

  setTitle: (title: string): Action => ({
    title,
    type: 'SET_TITLE',
  }),
};

export default headerActions;
