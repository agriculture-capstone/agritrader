/*----------------------- State -----------------------*/

export interface LoginState {
  username: string;
}

/*----------------------- Actions -----------------------*/

export type Action = {
  type: 'SET_USERNAME',
  username: string,
} | {
  type: 'DEFAULT',
};
