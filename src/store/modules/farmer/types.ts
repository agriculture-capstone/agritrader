import { CoreState, CoreData, PartialCoreData, IdCoreData } from '../../types';

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

/** Model for Farmer in store */
export type Farmer = CoreData<BaseFarmer>;

/** Model for creating a farmer via thunk */
export type BaseCreateFarmer = BaseFarmer;

/** Model for updating farmer via thunk */
export type BaseUpdateFarmer = IdCoreData<BaseFarmer>;

/** Model for Farmer in reducer update */
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
  type: 'UPDATE_FARMER_UUID',
  oldUUID: string,
  farmer: PartialFarmer,
} | {
  type: 'DO_NOT_USE',
};

