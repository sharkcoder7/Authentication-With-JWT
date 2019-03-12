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
      .route('/users/me/token')
      .all(UserMiddleware.authenticate)
      .delete(UserController.logOut);


    router
      .route('/users/login')
      .post(UserController.signIn);
  }
}

export default UserRoutes;
