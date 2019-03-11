import app from './src/app';

const { PORT = 8080, NODE_ENV = 'development' } = process.env;

app.listen(PORT, () => console.log(`Listening on port ${PORT}, environment: ${NODE_ENV}`)); // eslint-disable-line no-console
