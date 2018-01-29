import { CoreModuleState, StoreRow } from '../../types';

/*----------------------- Models -----------------------*/

/** Base model for a farmer */
export interface Farmer {
  firstName: string;
  middleName: string;
  lastName: string;
  phoneCountry: string;
  phoneArea: string;
  phoneNumber: string;
  notes?: string;
  companyName?: string;
}

/** Model for a farmer in store */
export type StoreFarmer = StoreRow<Farmer>;

/*----------------------- State -----------------------*/

/** Farmer module state */
export type FarmerState = CoreModuleState<Farmer>;
