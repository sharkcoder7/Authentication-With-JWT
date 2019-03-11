import _ from 'lodash';
import HttpStatus from 'http-status-codes';

import logger from '../../../config/logger';
import ErrorHelpers from '../../../helpers/ErrorHelpers';
import User from '../models/user';

class UserController {
  static signUp(req, res, next) {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);

    user.save().then(() => (
      user.generateAuthToken(user)
    )).then((token) => {
      const trimedUser = user.trimUserResponse(user);
      res.header('x-auth', token).send(trimedUser);
    }).catch((e) => {
      res.status(HttpStatus.BAD_REQUEST).send(ErrorHelpers.sendErrorMessage(HttpStatus.BAD_REQUEST, 'Could not save the user'));
      logger.warn(ErrorHelpers.sendErrorMessage(HttpStatus.BAD_REQUEST, e.message));
      next(e);
    });
  }
}

export default UserController;
