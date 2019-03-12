import _ from 'lodash';
import HttpStatus from 'http-status-codes';

import ErrorHelpers from '../../../helpers/ErrorHelpers';
import User from '../models/User';

class UserController {
  static signUp(req, res, next) {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);
    user.save()
      .then(() => user.generateAuthToken(user))
      .then((token) => {
        const trimedUser = user.trimUserResponse(user);
        res.header('x-auth', token).json(trimedUser);
      })
      .catch((e) => {
        ErrorHelpers.logErrorMessage(HttpStatus.BAD_REQUEST, e.message);
        ErrorHelpers.sendErrorMessage(res, HttpStatus.BAD_REQUEST, 'Looks like you already exist, don\'t you ?');
        next(e);
      });
  }

  static authenticateUser(req, res) {
    res.send(req.user);
  }

  static login(req, res) {
    const body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password)
      .then(user => (
        user.generateAuthToken(user)
          .then((token) => {
            const trimedUser = user.trimUserResponse(user);
            res.header('x-auth', token).json(trimedUser);
          })
      ))
      .catch((e) => {
        ErrorHelpers.logErrorMessage(HttpStatus.UNAUTHORIZED, e.message);
        return ErrorHelpers.sendErrorMessage(res, HttpStatus.UNAUTHORIZED, 'Password and email are not matching. New user ?, sign up instead !');
      });
  }
}

export default UserController;
