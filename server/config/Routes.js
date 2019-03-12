import HttpStatus from 'http-status-codes';

import ErrorHelpers from '../helpers/ErrorHelpers';
import UserRoutes from '../api/user/routes/user-routes';


class Routes {
  static init(app, router) {
    UserRoutes.init(router);
    app.use('/users', router);

    // Catch 404 and forward to error handler
    app.use((req, res) => {
      const err = new Error('Page Not Found');
      ErrorHelpers.logErrorMessage(HttpStatus.NOT_FOUND, err.message);
      ErrorHelpers.sendErrorMessage(res, HttpStatus.NOT_FOUND, err.message);
    });

// Error handler
    app.use((req, res) => {
      const err = new Error('Uncaught error. Yep, That is pretty bad.');
      ErrorHelpers.logErrorMessage(HttpStatus.INTERNAL_SERVER_ERROR, err.message);
      ErrorHelpers.sendErrorMessage(res, HttpStatus.INTERNAL_SERVER_ERROR, err.message);
    });
  }
}

export default Routes;
