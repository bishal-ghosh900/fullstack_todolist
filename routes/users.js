const { UserWithTodo } = require("../models/UserWithTodo");
const { User, userValidation } = require("../models/User");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const Fawn = require("fawn");
const config = require("config");

Fawn.init(config.get("db"));

router.get("/", async (req, res) => {
  const user = await User.find({});
  res.send(user);
});
router.post("/", async (req, res) => {
  const { error } = userValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) return res.status(400).send("This email already exists.");

  const hash = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hash,
  });

  const userWithTodo = new UserWithTodo({
    username: req.body.username,
    email: req.body.email,
  });

  Fawn.Task().save("users", user).save("userwithtodos", userWithTodo).run();

  res.send(user);
});

module.exports = router;
