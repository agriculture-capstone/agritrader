import { CoreModuleState, StoreLocalCreationRow, StoreLocalUpdateRow } from '../../types';

/*----------------------- Models -----------------------*/

export interface Farmer {
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

/** Farmer module state */
export type FarmerState = CoreModuleState<Farmer>;

/*----------------------- Actions -----------------------*/

/** Actions for farmer module */
export type Action = {
  type: 'CREATE_FARMER_LOCAL',
  row: StoreLocalCreationRow<Farmer>,
} | {
  type: 'CREATE_FARMER_REMOTE',
  localUUID: string,
  coreUUID: string,
  lastModified: string,
} | {
  type: 'UPDATE_FARMER_LOCAL',
  row: StoreLocalUpdateRow<Farmer>,
} | {
  type: 'UPDATE_FARMER_REMOTE',
  uuid: string,
  lastModified: string,
} | {
  type: 'DO_NOT_USE',
};

