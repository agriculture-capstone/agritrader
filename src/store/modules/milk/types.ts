import { CoreModuleState } from '../../types';

/*----------------------- Models -----------------------*/

/** Model for a milk entry */
export interface MilkEntry {
  datetime: string;
  toPersonUuid: string;
  fromPersonUuid: string;
  amountOfProduct: number;
  costPerUnit: number;
  currency: string;
  quality: string;
}

/*----------------------- State -----------------------*/

/** Milk module state */
export type MilkState = CoreModuleState<MilkEntry>;
