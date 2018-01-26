/*----------------------- State -----------------------*/

export interface SensitiveState {
  jwt: string;
}

/*----------------------- Actions -----------------------*/

export type Action = {
  type: 'SET_JWT',
  jwt: string,
} | {
  type: 'DO_NOT_USE',
};
