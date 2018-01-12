/*
 * This is the basic model for a farmer within the app
 */

/*
 * Enum to account for different possible pay cycles
 */
enum payCycleEnum {
    WEEKLY = 0,
    BIWEEKLY,
    MONTHLY,
}

/*
 * The actual farmer interface
 */
export interface farmer {
    name: string;
    phoneNumber: string;
    payCash: boolean;
    payCycle: payCycleEnum;
    notes: string;
    farmerID: string;
}
