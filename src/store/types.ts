import { AppState, Action as AppAction } from './modules/app/types';

export interface State {
  app: AppState;
}

export type Action
  = AppAction;
