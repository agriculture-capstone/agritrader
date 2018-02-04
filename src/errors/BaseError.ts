/**
 * Base error class for custom errors
 */
export class BaseError extends Error {

  constructor(ErrorType: Function, message: string) {
    super(message);
    this.name = ErrorType.prototype.constructor.name;
    this.stack = (new Error(message)).stack;
  }
}
