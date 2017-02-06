var winston = require('winston');
winston.handleExceptions(new winston.transports.Console({ colorize: true }));

throw new Error('Hello, winston!');