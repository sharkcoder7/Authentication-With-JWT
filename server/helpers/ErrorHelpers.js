import HttpStatus from 'http-status-codes';

import logger from '../config/logger';

class ErrorHelpers {

  static sendErrorMessage(res, errorCode, message) {
    const error = {
      code: errorCode,
      errorCodeMessage: HttpStatus.getStatusText(errorCode),
      message,
    };
    return res.status(errorCode).json(error);
  }

  static logErrorMessage(errorCode, message) {
    const error = {
      code: errorCode,
      errorCodeMessage: HttpStatus.getStatusText(errorCode),
      message,
    };
    return logger.error(error);
  }
}

export default ErrorHelpers;
