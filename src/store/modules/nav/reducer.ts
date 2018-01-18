import { Reducer } from 'redux';

import { NavState, Action } from './types';
import initialState from './state';
import Navigator from '../../../view/navigation/navigator';

const navReducer: Reducer<NavState> = (state = initialState, action: Action) => {
  const nextState = Navigator.router.getStateForAction(action, state);

  return nextState || state;
};

export default navReducer;
