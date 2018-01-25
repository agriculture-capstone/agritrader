/*----------------------- State -----------------------*/

export interface SensitiveState {
  jwt: string;
}

/*----------------------- Actions -----------------------*/

export type Action = {
  type: 'SET_JWT',
} | {
  type: 'DO_NOT_USE',
};
