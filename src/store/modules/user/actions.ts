import { Action } from './types';

const userActions = {
  updateUser: (uuidUser: string): Action => ({
    uuidUser,
    type: 'UPDATE_USER',
  }),
  updateFarmer: (uuidFarmer: string): Action => ({
    uuidFarmer,
    type: 'UPDATE_FARMER',
  }),
  deleteUser: (): Action => ({
    type: 'DELETE_USER',
  }),
  deleteFarmer: (): Action => ({
    type: 'DELETE_USER',
  }),
};

export default userActions;
