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

export type Dairy = CoreData<BaseDairy>;

export type PartialDairy = PartialCoreData<BaseDairy>;

/*----------------------- State -----------------------*/

export interface DairyState extends CoreState {
  dairyList: Dairy[];
}

/*----------------------- Actions -----------------------*/

export type Action = {
  type: 'UPDATE_DAIRY',
  dairy: PartialDairy,
} | {
  type: 'CREATE_DAIRY',
  dairy: Dairy,
} | {
  type: 'DO_NOT_USE',
}; 
