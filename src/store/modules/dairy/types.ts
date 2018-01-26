import { CoreState, CoreData, PartialCoreData } from '../../types';

/*----------------------- Models -----------------------*/

interface BaseDairy {
  datetime: string;
  toUUID: string;
  fromUUID: string;
  volume: string;
  quality: string;
  costPerUnit: string;
}

/** Dairy model containing all attributes */
export type Dairy = CoreData<BaseDairy>;
/** Dairy model all attributes except lastModified and containsLocal */
export type PartialDairy = PartialCoreData<BaseDairy>;

/*----------------------- State -----------------------*/
/** Dairy State*/
export interface DairyState extends CoreState {
  dairyList: Dairy[];
}

/*----------------------- Actions -----------------------*/
/** Dairy Action Types */
export type Action = {
  type: 'UPDATE_DAIRY',
  dairy: PartialDairy,
} | {
  type: 'CREATE_DAIRY',
  dairy: Dairy,
} | {
  type: 'DO_NOT_USE',
}; 
