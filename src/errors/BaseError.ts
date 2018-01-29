/**
 * Base error class for custom errors
 */
export class BaseError extends Error {
  constructor(error: Function, message: string) {
    super(message);
  }
}
