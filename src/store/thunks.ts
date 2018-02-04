import { ThunkAction } from 'redux-thunk';

import { LoginPayload } from './types';

const rootThunks = {
  login: (payload: LoginPayload) => (dispatch) => {
    dispatch({
      payload,
      type: 'LOGIN',
    });
  },
};

export default rootThunks;
