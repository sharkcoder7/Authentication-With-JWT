import path from 'path';
import winston from 'winston';

const ENV = process.env.NODE_ENV || 'development';

const logger = new winston.Logger({
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
});

logger.add(winston.transports.Console, {
  level: 'silly',
  handleExceptions: true,
  json: false,
  colorize: true,
  prettyPrint: true,
});

logger.add(winston.transports.File, {
  level: 'info',
  filename: path.join(__dirname, './../../logs/all-logs.log'),
  handleExceptions: true,
  json: true,
  maxsize: 5242880, // 5MB
  maxFiles: 5,
  colorize: false,
});

let log;

// @FIXME : What should be logged ? and when ?
if (ENV !== 'development') {
  log = {
    write: message => logger.info(message),
  };
} else {
  log = {
    write: message => logger.info(message),
  };
}

logger.stream = log;

export default logger;
