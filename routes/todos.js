const express = require("express");
const router = express.Router();
const { UserWithTodo } = require("../models/UserWithTodo");
const { User } = require("../models/User");
const auth = require("../middleware/auth");
const { validateTodo } = require("../models/UserWithTodo");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  const userWithTodo = await UserWithTodo.findOne({ email: user.email });
  res.send(userWithTodo);
});

router.post("/me", auth, async (req, res) => {
  const { error } = validateTodo(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.user._id);
  const previousUserWithTodo = await UserWithTodo.findOne({
    email: user.email,
  });
  previousUserWithTodo.todos.push(req.body);

  await previousUserWithTodo.save();
  res.send(previousUserWithTodo);
});

router.put("/me/:id", auth, async (req, res) => {
  const { error } = validateTodo(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.user._id);
  const userWithTodo = await UserWithTodo.findOne({ email: user.email });

  const todo = userWithTodo.todos.find((obj) => obj._id == req.params.id);
  if (!todo) return res.status(400).send("todo is not available with this id");
  todo.todo = req.body.todo;

  await userWithTodo.save();
  res.send(userWithTodo);
});

router.delete("/me/:id", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  const userWithTodo = await UserWithTodo.findOne({ email: user.email });

  const todo = userWithTodo.todos.find((obj) => obj._id == req.params.id);
  if (!todo) return res.status(400).send("todo is not available with this id");

  const todos = userWithTodo.todos.filter((obj) => obj._id != req.params.id);
  userWithTodo.todos = todos;

  await userWithTodo.save();
  res.send(userWithTodo);
});

module.exports = router;
