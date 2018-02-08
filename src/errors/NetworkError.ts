import { BaseError } from './BaseError';

const DEFAULT_MSG = 'Failed to make request due to poor network conditions';

/** Error thrown when network connection is expensive or absent */
export class NetworkError extends BaseError {

  public static id = 'NetworkError';

  constructor(msg = DEFAULT_MSG) {
    super(NetworkError, msg);
  }
}
