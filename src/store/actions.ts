import { RootAction } from './types';

const rootActions = {
  logout: (): RootAction => ({
    type: 'LOGOUT',
  }),

  login: (): RootAction => ({
    type: 'LOGIN',
  }),
};

export default rootActions;
