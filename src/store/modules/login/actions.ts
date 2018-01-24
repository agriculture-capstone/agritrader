import { Action } from './types';

const loginActions = {
  setUsername: (username: string): Action => ({
    username,
    type: 'SET_USERNAME',
  }),
};

export default loginActions;
