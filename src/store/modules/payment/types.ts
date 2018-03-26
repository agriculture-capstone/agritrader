import { CoreModuleState, StoreRow } from '../../types';

/*----------------------- Models -----------------------*/

/** Model for a payment entry */
export interface PaymentEntry {
  type: 'payment';
  datetime: string;
  toPersonUuid: string;
  fromPersonUuid: string;
  amount: number;
  currency: string;
}

/** Model for a payment entry in the store */
export type StorePaymentEntry = StoreRow<PaymentEntry>;

/*----------------------- State -----------------------*/

/** Payment module state */
export type PaymentState = CoreModuleState<PaymentEntry>;
