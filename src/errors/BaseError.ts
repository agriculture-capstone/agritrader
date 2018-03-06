interface ErrorType extends Function {
  id: string;
}

/**
 * Base error class for custom errors
 */
export class BaseError extends Error {

  /** Unique identifier for error */
  public id: string;

  constructor(error: ErrorType, message: string) {
    super(message);
    this.id = error.id;
    this.stack = (new Error(message)).stack;
  }
}
