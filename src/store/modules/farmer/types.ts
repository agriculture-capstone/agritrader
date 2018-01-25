import { CoreState, CoreData, PartialCoreData } from '../../types';

/*----------------------- Models -----------------------*/

interface BaseFarmer {
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phoneCountry?: string;
  phoneArea?: string;
  phoneNumber?: string;
  companyName?: string;
}

export type Farmer = CoreData<BaseFarmer>;

export type PartialFarmer = PartialCoreData<BaseFarmer>;

/*----------------------- State -----------------------*/

export interface FarmerState extends CoreState {
  farmers: Farmer[];
}

/*----------------------- Actions -----------------------*/

export type Action = {
  type: 'UPDATE_FARMER',
  farmer: PartialFarmer,
} | {
  type: 'CREATE_FARMER',
  farmer: Farmer,
} | {
  type: 'DO_NOT_USE',
}; 

