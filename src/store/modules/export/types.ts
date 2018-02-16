import { CoreModuleState, StoreRow } from '../../types';

/*----------------------- Models -----------------------*/

/** Model for a export entry */
export interface ExportEntry {
  type: 'export';
  datetime: string;
  transportId: string;
  fromPersonUuid: string;
  amountOfProduct: number;
}

/** Model for a export entry in store */
export type StoreExportEntry = StoreRow<ExportEntry>;

/*----------------------- State -----------------------*/

/** export module state */
export type ExportState = CoreModuleState<ExportEntry>;
