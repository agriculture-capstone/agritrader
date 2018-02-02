import { CoreModuleState, StoreRow } from '../../types';

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

/** Model for a milk entry in store */
export type StoreMilkEntry = StoreRow<MilkEntry>;

/*----------------------- State -----------------------*/

/** Milk module state */
export type MilkState = CoreModuleState<MilkEntry>;
