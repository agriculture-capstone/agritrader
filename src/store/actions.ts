import { RootAction } from './types';

const rootActions = {
  logout: (): RootAction => ({
    type: 'LOGOUT',
  }),

};

export default rootActions;
