

class AgriDate {

  public static convertToDate = (utcDate: string) => {
    let date = new Date(utcDate);
  }

  public static currentDate = () => {
    return new Date().getTime();
  }
}

