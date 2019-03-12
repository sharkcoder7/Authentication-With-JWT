import app from './app';
import logger from './config/logger';

const ENV = process.env.NODE_ENV || 'development';
const config = require('./../env.json')[ENV];

app.listen(config.PORT, () => logger.trace('SERVER STARTED', { port: config.PORT, environment: ENV })); // eslint-disable-line no-console
