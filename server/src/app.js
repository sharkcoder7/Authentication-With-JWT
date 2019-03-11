import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import HttpStatus from 'http-status-codes';

import routes from './routes';
import DBConfig from '../db/DBConfig';

const ENV = process.env.NODE_ENV || 'development';
const config = require('./../../env.json')[ENV];

const app = express();
app.disable('x-powered-by');

// View engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(logger('dev', {
  skip: () => ENV === 'test',
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../../public')));


// Database
DBConfig.init(config);

// Routes
app.use('/', routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = HttpStatus.NOT_FOUND;
  next(err);
});

// Error handler
app.use((err, req, res) => { // eslint-disable-line no-unused-vars
  res
    .status(err.status || HttpStatus.INTERNAL_SERVER_ERROR)
    .render('error', {
      message: err.message,
    });
});

export default app;
