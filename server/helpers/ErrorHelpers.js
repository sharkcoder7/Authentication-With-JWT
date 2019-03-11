import HttpStatus from 'http-status-codes';

class ErrorHelpers {
  static sendErrorMessage(errorCode, msg, e) {
    const httpErrorCode = errorCode;
    return `///// Error code: ${httpErrorCode} - ${HttpStatus.getStatusText(httpErrorCode)} ////// ${msg}\n\n${e || ''}`;
  }
}

export default ErrorHelpers;
