/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .sort({ likes: -1 })
    .populate('author', { username: 1, name: 1, id: 1 });

  response.json(blogs);
});

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog);
});

blogRouter.post('/', async (request, response) => {
  const user = request.user;

  if (user === undefined) {
    return response.status(401).json({ error: 'no authorization' });
  }

  const newBlog = Blog({
    title: request.body.title,
    author: user.id,
    url: request.body.url,
    likes: process.env.NODE_ENV === 'test' ? request.body.likes : 0,
  });

  const result = await newBlog.save();
  user.blogs = user.blogs.concat(newBlog._id);
  await user.save();

  const userDB = await User.findById(result.author.toString());

  const newResult = {
    id: result.id,
    title: result.title,
    likes: result.likes,
    url: result.url,
    author: {
      username: userDB.username,
      name: userDB.name,
    },
  };

  return response.status(201).json(newResult);
});

blogRouter.delete('/:id', async (request, response) => {
  const user = request.user;

  if (user === undefined) {
    response.status(401).json({ error: 'no authorization' });
  }

  const blogToDelete = await Blog.findById(request.params.id);

  if (blogToDelete === null) {
    return response.status(404).json({ error: 'blog not found' });
  }

  if (blogToDelete.author.toString() !== user.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  await blogToDelete.deleteOne();
  // await Blog.findByIdAndDelete(request.params.id);
  return response.status(204).end();
});

blogRouter.put('/:id', async (request, response) => {
  const user = request.user;

  if (user === undefined) {
    response.status(401).json({ error: 'no authorization' });
  }

  const body = request.body;

  const blogToUpdate = await Blog.findById(request.params.id);

  if (blogToUpdate === null) {
    return response.status(404).json({ error: 'blog not found' });
  }

  if (blogToUpdate.author.toString() === user.id) {
    blogToUpdate.title = body.title ? body.title : blogToUpdate.title;
    blogToUpdate.url = body.url ? body.url : blogToUpdate.url;
  }

  blogToUpdate.likes = body.likes ? body.likes : blogToUpdate.likes;

  await blogToUpdate.save();
  response.json(blogToUpdate);
});

module.exports = blogRouter;
