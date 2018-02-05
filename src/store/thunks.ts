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
    SyncService();
  },

  logout: (): Thunk<void> => async (dispatch) => {
    // Stop the sync service, wait for any current jobs
    await SyncService.stop();

    // Dispatch logout action
    dispatch({
      type: 'LOGOUT',
    });
  },
};

export default rootThunks;
