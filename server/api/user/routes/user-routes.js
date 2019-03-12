import UserController from '../controllers/user-controller';
import UserMiddleware from '../middlewares/UserMiddleware';

class UserRoutes {
  static init(router) {
    router
      .route('/users')
      .post(UserController.signUp);

    router
      .route('/users/me')
      .all(UserMiddleware.authenticate)
      .get(UserController.authenticateUser);
  }
}

export default UserRoutes;
