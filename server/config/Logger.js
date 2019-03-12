import path from 'path';
import winston from 'winston';

const ENV = process.env.NODE_ENV || 'development';

const loggerOptions = {
  levels: {
    trace: 9,
    input: 8,
    verbose: 7,
    prompt: 6,
    debug: 5,
    info: 4,
    data: 3,
    help: 2,
    warn: 1,
    error: 0,
  },
  colors: {
    trace: 'magenta',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    debug: 'blue',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    error: 'red',
  },
  emitErrs: true,
  exitOnError: false,
};

const loggerConsoleOptions = {
  level: 'trace',
  handleExceptions: true,
  json: false,
  colorize: true,
  prettyPrint: true,
};

const loggerFileOptions = () => {
  let conf = {
    level: 'info',
    filename: path.join(__dirname, './../../logs/dev.log'),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  };
  if (ENV === 'prodcution') {
    conf = {
      level: 'info',
      filename: path.join(__dirname, './../../logs/prod.log'),
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    };
  } else if (ENV === 'test') {
    conf = {
      level: 'info',
      filename: path.join(__dirname, './../../logs/test.log'),
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    };
  }
  return conf;
};

let log;
let logger; // eslint-disable-line import/no-mutable-exports

// @FIXME : What should be logged ? and when ?
if (ENV !== 'test') {
  logger = new winston.Logger(loggerOptions);
  logger.add(winston.transports.Console, loggerConsoleOptions);
  logger.add(winston.transports.File, loggerFileOptions());
  log = {
    write: message => logger.info(message),
  };
} else {
  logger = new winston.Logger(loggerOptions);
  logger.add(winston.transports.File, loggerFileOptions());
  log = {
    write: message => logger.info(message),
  };
}

logger.stream = log;

export default logger;
