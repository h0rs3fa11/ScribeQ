const {
  test, describe, after, beforeEach,
} = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');

const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  await Blog.insertMany(helper.initialBlogs);
});

describe('api baisc test', async () => {
  test('blogs are returned as json', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('there are two inital blogs', async () => {
    const response = await api.get('/api/blogs');
    assert(response.body.length, helper.initialBlogs.length);
  });

  test('create blog', async () => {
    const newBlog = {
      title: 'lol',
      author: 'abc',
      url: 'http://google.com',
      likes: 5,
    };

    const oldResult = await api.get('/api/blogs');

    await api.post('/api/blogs/').send(newBlog).expect(201).expect('Content-Type', /application\/json/);

    // include the new blog
    const newResult = await api.get('/api/blogs');
    const contents = newResult.body.map((result) => result.content);

    // length verify
    assert(contents.length, oldResult + 1);
  });

  test('blog contains item named id', async () => {
    const result = await api.get('/api/blogs');
    const firstBlog = result.body[0];
    assert(firstBlog.id !== undefined);
  });

  test('test when missing likes, default value should be zero', async () => {
    const newBlog = {
      title: 'lol',
      author: 'abc',
      url: 'http://google.com',
    };
    const result = await api.post('/api/blogs').send(newBlog).expect(201);
    assert(result.body.likes === 0);
  });

  test('test when required items are missing', async () => {
    const newBlog = {
      author: 'abc',
      url: 'http://google.com',
    };
    await api.post('/api/blogs').send(newBlog).expect(400);

    const newBlogMissingAuthor = {
      title: 'lol',
      url: 'http://google.com',
    };
    await api.post('/api/blogs').send(newBlogMissingAuthor).expect(400);
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
