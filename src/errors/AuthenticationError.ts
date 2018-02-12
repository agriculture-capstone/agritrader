import { BaseError } from './BaseError';

const DEFAULT_MSG = 'Failed to authenticate';

/**
 * Error thrown when client fails to authenticate using credentials
 */
export class AuthenticationError extends BaseError {

  public static id = 'AuthenticationError';

  constructor(msg = DEFAULT_MSG) {
    super(AuthenticationError, msg);
  }
}
