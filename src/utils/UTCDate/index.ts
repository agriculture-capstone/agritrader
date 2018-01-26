/**
 * Date utiltity for working with UTC dates
 */
export default class UTCDate {
  public readonly utcDateString: string;

  public constructor(utcDateString: string) {
    if (Number.isNaN(Date.parse(utcDateString))) throw new Error('Invalid date string');
    this.utcDateString = utcDateString;
  }

  /** Old date, will always be older than last modified */
  public static OLD_DATE = '1970-01-01 00:00:00Z';

  /** Convert a date string to Date (UTC) */
  public static convertToDate(dateString: string) {
    const utcDateString = `${dateString}Z`;
    return new Date(utcDateString);
  }

  private static pad(digits: number, upperLimit = 10) {
    return digits < upperLimit ? '0' + digits : digits;
  }

  /** Get current date UTC as a string */
  public static getCurrentDate(): string {
    const upperMillisecondsLimit = 100;
    const date = new Date();
    const year = date.getUTCFullYear();
    const month = UTCDate.pad(date.getUTCMonth());
    const day = UTCDate.pad(date.getUTCDate());
    const hours = UTCDate.pad(date.getUTCHours());
    const minutes = UTCDate.pad(date.getUTCMinutes());
    const seconds = UTCDate.pad(date.getUTCSeconds());
    const milliseconds = UTCDate.pad(date.getUTCMilliseconds(), upperMillisecondsLimit);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}:${milliseconds}`;
  }
}

