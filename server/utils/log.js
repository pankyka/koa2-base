import fs from 'fs';
import path from 'path';
import moment from 'moment';
import winston from 'winston';

const ERROR_LOG = 'logs/exceptions.log';
const LOG_LEVEL = process.env.LOG_LEVEL;

checkLogDirectorySync(ERROR_LOG);

winston.handleExceptions(new winston.transports.File({
  level: 'error',
  filename: ERROR_LOG,
  maxsize: 10000,
  maxFiles: 5,
  handleExceptions: true,
  humanReadableUnhandledException: true
}));

const logger = new winston.Logger({
  level: LOG_LEVEL || 'debug',
  transports: [
    new winston.transports.Console({
      colorize: true,
      timestamp: consoleLogTimestamp
    }),
    new winston.transports.File({
      level: 'error',
      filename: ERROR_LOG,
      maxsize: 10000,
      maxFiles: 5
    })
  ],
  exitOnError: false
});

export default logger;

// helpers

function consoleLogTimestamp () {
  return moment().format('YYYY-MM-DD HH:mm:ss');
}

function checkLogDirectorySync (logFile) {

  if (!fs.existsSync(path.dirname(logFile))) {

    fs.mkdirSync(path.dirname(logFile));
  }
}