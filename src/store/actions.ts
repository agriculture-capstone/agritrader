import { RootAction } from './types';

const rootActions = {
  logout: (): RootAction => ({
    type: 'LOGOUT',
  }),

  login: (payload: { uuid: string, jwt: string }): RootAction => ({
    payload,
    type: 'LOGIN',
  }),
};

export default rootActions;
