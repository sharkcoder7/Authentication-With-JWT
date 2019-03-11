import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';

import logger from './logger';

class ExpressConfig {
  static init(app, ENV) {
    // Compression middleware (should be placed before express.static)
    app.use(compression({
      threshold: 512,
    }));
    app.disable('x-powered-by');
    app.use(express.static(path.join(__dirname, '../../public')));

// View engine setup
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'pug');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Don't log during tests
    // Logging middleware
    if (ENV !== 'test') {
      app.use(morgan('combined', { stream: logger.stream }));
    }
  }
}

export default ExpressConfig;
