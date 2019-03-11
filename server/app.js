import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import Routes from './config/Routes';
import MongooseConfig from './config/MongooseConfig';
import logger from './config/Logger';

const ENV = process.env.NODE_ENV || 'development';
const config = require('../env.json')[ENV];

const app = express();
app.disable('x-powered-by');
app.use(morgan('combined',
  {
    stream: { write: message => logger.info(message) },
  },
));
// View engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../public')));


MongooseConfig.init(config);
Routes.init(app, express.Router());

export default app;
