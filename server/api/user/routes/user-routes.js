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

    router
      .route('/users/login')
      .post(UserController.login);
  }
}

export default UserRoutes;
