const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Unauthorized user");

  try {
    const payload = jwt.verify(token, config.get("secret"));
    req.user = payload;
    next();
  } catch (ex) {
    return res.status(400).send("Invalid token");
  }
};
