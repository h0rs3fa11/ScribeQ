const bcrypt = require('bcrypt');
const userRouter = require('express').Router();

const User = require('../models/user');

userRouter.post('/', async (request, response) => {
  const { username, password } = request.body;
  const saltRound = 10;
  const passwordHash = await bcrypt.hash(password, saltRound);

  const newUser = new User({
    username,
    passwordHash,
  });

  const user = await newUser.save();
  response.status(201).json(user);
});

userRouter.get('/', async (request, response) => {
  const user = await User.find({}).populate('blogs', { title: 1, url: 1 });
  response.status(200).json(user);
});

module.exports = userRouter;
