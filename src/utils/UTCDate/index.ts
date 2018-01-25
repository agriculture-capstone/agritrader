export default class UTCDate {

  public static OLD_DATE = '1970-01-01 00:00:00Z';

  public static convertToDate(dateString: string) {
    const utcDateString = `${dateString}Z`;
    return new Date(utcDateString);
  }

  public static getCurrentDate(): string {
    return new Date().toUTCString();
  }
}

