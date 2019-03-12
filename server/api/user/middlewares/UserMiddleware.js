import HttpStatus from 'http-status-codes';
import User from './../models/User';

import ErrorHelpers from '../../../helpers/ErrorHelpers';

class UserMiddleware {
  static authenticate(req, res, next) {
    const token = req.header('x-auth');
    User.findByToken(token).then((user) => {
      if (!user) {
        return Promise.reject(new Error('We could not find you in the db.'));
      }
      // Modify request object to be used in further methods.
      req.user = user.trimUserResponse(user);
      req.token = token;
      return next();
    }).catch((e) => {
      ErrorHelpers.logErrorMessage(HttpStatus.UNAUTHORIZED, e.message);
      ErrorHelpers.sendErrorMessage(
        res,
        HttpStatus.UNAUTHORIZED,
        'Something went wrong, we cannot grant you authorization');
      next(e);
    });
  }
}

export default UserMiddleware;
