/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('author', { username: 1, name: 1, id: 1 });
  response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
  const decodeToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodeToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  const user = await User.findById(decodeToken.id);

  if (user === null) {
    return response.status(401).json({ error: 'user doesn not exist' });
  }

  const newBlog = Blog({
    title: request.body.title,
    author: user._id,
    url: request.body.url,
    likes: request.body.likes || 0,
  });

  const result = await newBlog.save();
  user.blogs = user.blogs.concat(newBlog._id);
  await user.save();

  return response.status(201).json(result);
});

blogRouter.delete('/:id', async (request, response) => {
  const decodeToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodeToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  const blogToDelete = await Blog.findById(request.params.id);

  if (blogToDelete === null) {
    return response.status(401).json({ error: 'token invalid' });
  }

  if (blogToDelete.author.toString() !== decodeToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  await blogToDelete.deleteOne();
  // await Blog.findByIdAndDelete(request.params.id);
  return response.status(204).end();
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
