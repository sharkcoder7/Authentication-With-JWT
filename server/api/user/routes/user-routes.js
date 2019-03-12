import UserController from '../controllers/user-controller';
import UserMiddleware from '../middlewares/UserMiddleware';
import API from '../../constants/api';

class UserRoutes {
  static init(router) {
    router
      .route(API.SIGNUP)
      .post(UserController.signUp);

    router
      .route(API.ME)
      .all(UserMiddleware.authenticate)
      .get(UserController.authenticateUser);

    router
      .route(API.TOKEN)
      .all(UserMiddleware.authenticate)
      .delete(UserController.logOut);


    router
      .route(API.SIGNIN)
      .post(UserController.signIn);
  }
}

export default UserRoutes;
