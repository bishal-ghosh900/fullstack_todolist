const Joi = require("joi");
const mongoose = require("mongoose");

const userWithTodoSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  todos: [
    {
      type: new mongoose.Schema({
        todo: {
          type: String,
          minlength: 1,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      }),
    },
  ],
});

function validateTodo(todo) {
  const schema = Joi.object({
    todo: Joi.string().min(1).required(),
  });
  return schema.validate(todo);
}

const UserWithTodo = mongoose.model("UserWithTodo", userWithTodoSchema);

exports.UserWithTodo = UserWithTodo;
exports.validateTodo = validateTodo;
