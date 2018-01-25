/**
 * Date utiltity for working with UTC dates
 */
export default class UTCDate {

  /** Old date, will always be older than last modified */
  public static OLD_DATE = '1970-01-01 00:00:00Z';

  /** Convert a date string to Date (UTC) */
  public static convertToDate(dateString: string) {
    const utcDateString = `${dateString}Z`;
    return new Date(utcDateString);
  }

  /** Get current date UTC as a string */
  public static getCurrentDate(): string {
    return new Date().toUTCString();
  }
}

