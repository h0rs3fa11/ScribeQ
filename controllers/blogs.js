/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('author', { username: 1, name: 1, id: 1 });
  response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
  // related to user(temporary implement)
  const users = await User.find({});
  // const usersJSON = await users.map((user) => user.toJSON());
  const user = users[0];

  const newBlog = Blog({
    title: request.body.title,
    author: user._id,
    url: request.body.url,
    likes: request.body.likes || 0,
  });

  const result = await newBlog.save();
  user.blogs = user.blogs.concat(newBlog._id);
  await user.save();

  response.status(201).json(result);
});

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogRouter.put('/:id', async (request, response) => {
  const body = request.body;
  const blog = {
    title: body.title,
  };

  const updateBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  response.json(updateBlog);
});

module.exports = blogRouter;
