const logger = require("../startup/logging");

module.exports = function (handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (ex) {
      //   console.log(ex);
      next(ex);
    }
  };
};
