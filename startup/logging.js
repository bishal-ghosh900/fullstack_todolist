const winston = require("winston");

process.on("unhandledRejection", (error) => {
  throw error;
});

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: "logger.log",
      handleExceptions: true,
    }),
    new winston.transports.Console({
      format: winston.format.simple(),
      handleExceptions: true,
    }),
  ],
});
module.exports = logger;
