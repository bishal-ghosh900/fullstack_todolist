const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const password = await bcrypt.compare(req.body.password, user.password);
  if (!password) return res.status(400).send("Invalid email or password");

  const token = jwt.sign({ _id: user._id }, config.get("secret"));
  res.header("x-auth-token", token).send(token);
});

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9!@#%&\\-]*$"))
      .required(),
  });

  return schema.validate(user);
}

module.exports = router;
