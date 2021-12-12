const express = require("express");
const cors = require("cors");
const todos = require("../routes/todos");
const users = require("../routes/users");
const auth = require("../routes/auth");
const compression = require("compression");
const helmet = require("helmet");

module.exports = (app) => {
  app.use(express.json());
  app.use(cors());
  app.use(helmet());
  app.use(compression());
  app.use("/api/users/auth/", auth);
  app.use("/api/todos/", todos);
  app.use("/api/users/", users);
};
