import { BaseError } from './BaseError';

const DEFAULT_MSG = 'failed to make request, poor network conditions';

/** Error thrown when network connection is expensive or absent */
export class NetworkError extends BaseError {
  constructor(msg = DEFAULT_MSG) {
    super(NetworkError, msg);
  }
}
