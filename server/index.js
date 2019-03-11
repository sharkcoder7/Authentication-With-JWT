import app from './src/app';

const ENV = process.env.NODE_ENV || 'development';
const config = require('./../env.json')[ENV];

app.listen(config.PORT, () => console.log(`Listening on port ${config.PORT}, environment: ${ENV}`)); // eslint-disable-line no-console
