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

/** Model for Farmer */
export type Farmer = CoreData<BaseFarmer>;

/** Model for updating farmer */
export type PartialFarmer = PartialCoreData<BaseFarmer>;

/*----------------------- State -----------------------*/

/** Farmer module state */
export interface FarmerState extends CoreState {
  farmers: Farmer[];
}

/*----------------------- Actions -----------------------*/

/** Actions for farmer module */
export type Action = {
  type: 'UPDATE_FARMER',
  farmer: PartialFarmer,
} | {
  type: 'CREATE_FARMER',
  farmer: Farmer,
} | {
  type: 'DO_NOT_USE',
};

