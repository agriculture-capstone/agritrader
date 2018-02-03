import { CoreModuleState, StoreRow } from '../../types';

/*----------------------- Models -----------------------*/

/** Model for a milk entry */
export interface MilkEntry {
  type: 'milk';
  datetime: string;
  toPersonUuid: string;
  fromPersonUuid: string;
  amountOfProduct: number;
  costPerUnit: number;
  currency: string;
  milkQuality: string;
}

/** Model for a milk entry in store */
export type StoreMilkEntry = StoreRow<MilkEntry>;

/*----------------------- State -----------------------*/

/** Milk module state */
export type MilkState = CoreModuleState<MilkEntry>;
