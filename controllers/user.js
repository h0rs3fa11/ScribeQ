/* eslint-disable import/no-extraneous-dependencies */
const bcrypt = require('bcrypt');
const userRouter = require('express').Router();

const User = require('../models/user');

userRouter.post('/', async (request, response) => {
  const { username, password } = request.body;
  const saltRound = 10;

  // password requirement
  if (password.length < 8) {
    throw new Error('password is invalid');
  }

  const passwordHash = await bcrypt.hash(password, saltRound);

  const newUser = new User({
    username,
    passwordHash,
  });

  const user = await newUser.save();
  response.status(201).json(user);
});

userRouter.get('/', async (request, response) => {
  const user = await User.find({}).populate('blogs', { title: 1 });
  response.status(200).json(user);
});

module.exports = userRouter;
