import HttpStatus from 'http-status-codes';
import ErrorHelpers from '../helpers/ErrorHelpers';
import UserRoutes from '../api/user/routes/user-routes';

class Routes {
  static init(app, router) {
    UserRoutes.init(router);
    app.use('/', router);

    // Catch 404 and forward to error handler
    app.use((req, res, next) => {
      const err = new Error('Page Not Found');
      err.status = HttpStatus.NOT_FOUND;
      res.status(HttpStatus.NOT_FOUND).send(ErrorHelpers.sendErrorMessage(HttpStatus.BAD_REQUEST, err));
      next(err);
    });

// Error handler
    app.use((req, res, next) => {
      const err = new Error('Uncaught error. That is pretty bad.');
      err.status = HttpStatus.INTERNAL_SERVER_ERROR;
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(ErrorHelpers.sendErrorMessage(HttpStatus.BAD_REQUEST, err));
      next(err);
    });
  }
}

export default Routes;
