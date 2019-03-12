import express, { Router } from 'express';

import Routes from './config/Routes';
import MongooseConfig from './config/MongooseConfig';
import ExpressConfig from './config/ExpressConfig';

const ENV = process.env.NODE_ENV || 'development';
const config = require('../env.json')[ENV];

const app = express();
const router = Router({});

MongooseConfig.init(config.MONGODB_URI);
ExpressConfig.init(app, ENV);

Routes.init(app, router);


export default app;
