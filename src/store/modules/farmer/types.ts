import { CoreModuleState } from '../../types';

/*----------------------- Models -----------------------*/

/** Model for a farmer */
export interface Farmer {
  firstName: string;
  middleName?: string;
  lastName: string;
  phoneCountry: string;
  phoneArea: string;
  phoneNumber: string;
  companyName?: string;
}

/*----------------------- State -----------------------*/

/** Farmer module state */
export type FarmerState = CoreModuleState<Farmer>;
