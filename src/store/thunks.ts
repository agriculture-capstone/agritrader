import { LoginPayload, Thunk } from './types';
import SyncService from '../services/Sync';

const rootThunks = {
  login: (payload: LoginPayload): Thunk<void> => async (dispatch) => {
    // Dispatch login action
    dispatch({
      payload,
      type: 'LOGIN',
    });

    // Start sync service
    SyncService().start();
  },

  logout: (): Thunk<void> => async (dispatch) => {
    // Stop the sync service, wait for any current jobs
    SyncService.stop();

    // Dispatch logout action
    dispatch({
      type: 'LOGOUT',
    });
  },

  bypassLogin: (): Thunk<void> => async (dispatch) => {
    dispatch({
      type: 'BYPASS_LOGIN',
    });

    SyncService().start();
  },
};

export default rootThunks;
