import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

class MongooseConfig {
  static init(MONGODB_URI) {
    const URL = MONGODB_URI;

    mongoose.connect(URL);

    // CONNECTION EVENTS
// When successfully connected
    mongoose.connection.on('connected', () => {
      // eslint-disable-next-line no-console
      console.log('Mongoose default connection open to ', URL);
    });

// If the connection throws an error
    mongoose.connection.on('error', (err) => {
      // eslint-disable-next-line no-console
      console.log('Mongoose default connection error', err);
    });

// When the connection is disconnected
    mongoose.connection.on('disconnected', () => {
      // eslint-disable-next-line no-console
      console.log('Mongoose default connection disconnected');
    });

// If the Node process ends, close the Mongoose connection
    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        // eslint-disable-next-line no-console
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
      });
    });
  }
}

export default MongooseConfig;
