import UserController from '../controllers/user-controller';

class UserRoutes {
  static init(router) {
    router
      .route('/users')
      .post(UserController.signUp);
  }
}

export default UserRoutes;
