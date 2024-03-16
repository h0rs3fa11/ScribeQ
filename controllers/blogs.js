const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', (request, response, next) => {
  Blog
    .find({})
    .then((blogs) => {
      response.json(blogs);
    })
    .catch((error) => next(error));
});

blogRouter.post('/', (request, response, next) => {
  const blog = Blog(request.body);

  blog.save().then((result) => {
    response.json(result);
  })
    .catch((error) => next(error));
});

module.exports = blogRouter;
