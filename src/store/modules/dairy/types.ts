import { CoreModuleState } from '../../types';

/*----------------------- Models -----------------------*/

/** Model for a dairy entry */
export interface DairyEntry {
  datetime: string;
  toUUID: string;
  fromUUID: string;
  volume: string;
  quality: string;
  costPerUnit: string;
}

/*----------------------- State -----------------------*/

/** Dairy module state */
export type DairyState = CoreModuleState<DairyEntry>;
