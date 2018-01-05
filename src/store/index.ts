import { createStore } from 'redux';
import reducer from './reducer';
import { State } from './types';

export default createStore<State>(reducer);
