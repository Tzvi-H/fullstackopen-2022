const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  });
  res.json(users);
});

usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  if (!password || password.length < 3) {
    return res
      .status(400)
      .send({ error: "password must be at least 3 characters" });
  }

  const user = await User.findOne({ username });
  if (user) {
    return res.status(400).send({ error: "username must be unique" });
  }

  const newUser = new User({
    name,
    username,
    passwordHash: await bcrypt.hash(password, 10),
  });

  const savedUser = await newUser.save();
  res.status(201).json(savedUser);
});

module.exports = usersRouter;
