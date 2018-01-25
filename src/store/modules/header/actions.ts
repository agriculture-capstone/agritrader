import { Action } from './types';

const headerActions = {

  /** Show the header */
  setHeaderShown(shown: boolean): Action {
    return {
      shown,
      type: 'SET_HEADER_SHOWN',
    };
  },

  /** Set the title of the header */
  setTitle: (title: string): Action => ({
    title,
    type: 'SET_TITLE',
  }),
};

export default headerActions;
