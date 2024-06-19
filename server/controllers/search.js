const searchRouter = require('express').Router();
const Blog = require('../models/blog');

searchRouter.get('/', async (request, response) => {
  const { term } = request.query;
  const regex = new RegExp(term, 'i');
  try {
    const results = await Blog.find(
      {
        $or: [{ title: regex }, { content: regex }],
      },
    ).populate({
      path: 'author',
    });

    response.json(results);
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});

module.exports = searchRouter;
