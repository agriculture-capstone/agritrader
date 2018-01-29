import { Action } from './types';

const sensitiveActions = {
  setJwt: (jwt: string): Action => ({
    jwt,
    type: 'SET_JWT',
  }),
};

export default sensitiveActions;
