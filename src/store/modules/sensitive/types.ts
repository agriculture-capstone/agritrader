import { RootAction } from '../../types';

/*----------------------- State -----------------------*/

/** State for sensitive information module */
export interface SensitiveInfoState {
  jwt: string;
}

/*----------------------- Actions -----------------------*/

/** Action for sensitive module */
export type Action = RootAction | {
  type: 'SET_JWT',
  jwt: string,
};
