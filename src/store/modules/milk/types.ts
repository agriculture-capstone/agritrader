import { CoreModuleState } from '../../types';

/*----------------------- Models -----------------------*/

/** Model for a milk entry */
export interface MilkEntry {
  datetime: string;
  toUUID: string;
  fromUUID: string;
  volume: string;
  quality: string;
  costPerUnit: string;
}

/*----------------------- State -----------------------*/

/** Milk module state */
export type MilkState = CoreModuleState<MilkEntry>;
