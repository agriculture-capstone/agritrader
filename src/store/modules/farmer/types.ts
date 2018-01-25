import { CoreState, CoreData } from '../../types';

/*----------------------- Models -----------------------*/

export interface Farmer extends CoreData {
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phoneCountry?: string;
  phoneArea?: string;
  phoneNumber?: string;
  companyName?: string;
}

/*----------------------- State -----------------------*/

export interface State extends CoreState {
  farmers: Farmer[];
}

/*----------------------- Actions -----------------------*/

export type Action = {
  type: 'UPDATE_FARMER',
  farmer: Farmer,
} | {
  type: 'CREATE_FARMER',
  farmer: Farmer,
} | {
  type: 'DELETE_FARMER',
  farmerId: string;
};
