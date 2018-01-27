/*----------------------- State -----------------------*/

/** State for sensitive information module */
export interface SensitiveState {
  jwt: string;
}

/*----------------------- Actions -----------------------*/

/** Action for sensitive module */
export type Action = {
  type: 'SET_JWT',
  jwt: string,
} | {
  type: 'DO_NOT_USE',
};
