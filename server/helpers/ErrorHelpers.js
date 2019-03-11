import HttpStatus from 'http-status-codes';

class ErrorHelpers {
  static sendErrorMessage(errorCode, msg) {
    const httpErrorCode = errorCode;
    return `///// Error code: ${httpErrorCode} - ${HttpStatus.getStatusText(httpErrorCode)} ////// ${msg}`;
  }
}

export default ErrorHelpers;
