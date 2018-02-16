export default class Action {
  private blocking: boolean;

  public constructor(individualEvents = true) {
    // Bindings
    this.createEventHandler = this.createEventHandler.bind(this);

    // Init
    this.blocking = false;
  }

  public createEventHandler
    (fn: (...args: any[]) => Promise<void>)
    : (...args: any[]) => Promise<void> {
    return async (...args: any[]) => {
      if (this.blocking) return;

      this.blocking = true;
      await fn(...args);
      this.blocking = false;
    };
  }
}
