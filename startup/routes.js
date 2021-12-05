const express = require("express");
const cors = require("cors");
const todos = require("../routes/todos");
const users = require("../routes/users");
const auth = require("../routes/auth");

module.exports = (app) => {
  app.use(express.json());
  app.use(cors());
  app.use("/api/users/auth/", auth);
  app.use("/api/todos/", todos);
  app.use("/api/users/", users);
};
