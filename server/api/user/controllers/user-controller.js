import _ from 'lodash';
import HttpStatus from 'http-status-codes';
import ErrorHelpers from '../../../helpers/ErrorHelpers';

import User from '../models/user';

class UserController {
  static signUp(req, res, next) {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);

    user.save().then((newUser) => {
      res.send(newUser);
    }).catch((e) => {
      res.status(HttpStatus.BAD_REQUEST).send(ErrorHelpers.sendErrorMessage(HttpStatus.BAD_REQUEST, 'Could not save the user'));
      next(e);
    });
  }
}

export default UserController;
