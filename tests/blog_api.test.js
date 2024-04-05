/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
const {
  test, describe, after, beforeEach,
} = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');

const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const initUsers = await helper.createInitUsers();
  const userObj = initUsers.map((user) => new User(user));
  const promiseArray = userObj.map((user) => user.save());

  await Promise.all(promiseArray);

  const users = await helper.userInDB();
  const initUser = users.filter((user) => user.username === 'init1');

  helper.initialBlogs.forEach((blog) => {
    blog.author = initUser._id;
  });

  await Blog.insertMany(helper.initialBlogs);
});

describe('api basic test', () => {
  test('blogs are returned as json', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('there are two inital blogs', async () => {
    const response = await api.get('/api/blogs');
    assert(response.body.length, helper.initialBlogs.length);
  });

  test('blog contains item named id', async () => {
    const result = await api.get('/api/blogs');
    const firstBlog = result.body[0];
    assert(firstBlog.id !== undefined);
  });

  describe('create blog', () => {
    test('create blog', async () => {
      const newBlog = {
        title: 'lol',
        url: 'http://google.com',
        likes: 5,
      };

      await api.post('/api/blogs/').send(newBlog).expect(401);
    });

    test('create blog with authentication', async () => {
      // login
      const user = {
        username: 'init1',
        password: 'asdfasasd',
      };

      const loginInfo = await api.post('/api/login').send(user).expect(200);
      const { token } = loginInfo.body;

      const newBlog = {
        title: 'lol',
        url: 'http://google.com',
        likes: 5,
      };

      const oldResult = await api.get('/api/blogs').expect(200);

      await api.post('/api/blogs/').set('Authorization', `Bearer ${token}`).send(newBlog).expect(201);
      // include the new blog
      const newResult = await api.get('/api/blogs');
      const contents = newResult.body.map((result) => result.title);
      assert(contents.includes('lol'));
      // length verify
      assert.strictEqual(contents.length, oldResult.body.length + 1);
    });

    test('test when missing likes, default value should be zero', async () => {
      // login
      const user = {
        username: 'init1',
        password: 'asdfasasd',
      };

      const loginInfo = await api.post('/api/login').send(user).expect(200);
      const { token } = loginInfo.body;

      const newBlog = {
        title: 'lol',
        author: 'abc',
        url: 'http://google.com',
      };
      const result = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(201);
      assert(result.body.likes === 0);
    });

    test('test when required items are missing', async () => {
      const resultBefore = await api.get('/api/blogs').expect(200);
      // login
      const user = {
        username: 'init1',
        password: 'asdfasasd',
      };

      const loginInfo = await api.post('/api/login').send(user).expect(200);
      const { token } = loginInfo.body;

      const newBlogMissingAuthor = {
        title: 'lol',
      };
      await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlogMissingAuthor).expect(400);
      const resultAfter = await api.get('/api/blogs').expect(200);
      assert.strictEqual(resultBefore.body.length, resultAfter.body.length);
    });
  });

  describe('deletion of a blog', () => {
    test('delete one blog with authorization', async () => {
      // login
      const user = {
        username: 'init1',
        password: 'asdfasasd',
      };

      const loginInfo = await api.post('/api/login').send(user).expect(200);
      const { token, id } = loginInfo.body;
      const newBlog = {
        title: 'lol',
        url: 'http://google.com',
        likes: 5,
      };

      await api.post('/api/blogs/').set('Authorization', `Bearer ${token}`).send(newBlog).expect(201);

      const userInfo = await helper.getUserById(id);

      assert(userInfo.blogs.length);

      const blogBefore = await helper.bloginDB();

      const blogToDelete = userInfo.blogs[0].toString();

      await api.delete(`/api/blogs/${blogToDelete}`).set('Authorization', `Bearer ${token}`).expect(204);

      const blogAfter = await helper.bloginDB();
      assert.strictEqual(blogAfter.length, blogBefore.length - 1);

      const blogDeleted = await Blog.findById(blogToDelete);
      assert(blogDeleted === null);
    });

    test('delete one blog with a wrong user', async () => {
      // login with another user
      const user = {
        username: 'init1',
        password: 'asdfasasd',
      };

      const user2 = {
        username: 'init2',
        password: 'sfasdasd',
      };

      const loginInfo = await api.post('/api/login').send(user).expect(200);
      const { token, id } = loginInfo.body;

      const loginInfoUser2 = await api.post('/api/login').send(user2).expect(200);
      const token2 = loginInfoUser2.body.token;

      const newBlog = {
        title: 'lol',
        url: 'http://google.com',
        likes: 5,
      };
      // create a blog with init1
      await api.post('/api/blogs/').set('Authorization', `Bearer ${token}`).send(newBlog).expect(201);

      const userInfo = await helper.getUserById(id);

      assert(userInfo.blogs.length);

      const blogBefore = await helper.bloginDB();

      const blogToDelete = userInfo.blogs[0].toString();

      // delete the blog with init2
      await api.delete(`/api/blogs/${blogToDelete}`).set('Authorization', `Bearer ${token2}`).expect(401);

      const blogAfter = await helper.bloginDB();
      assert.strictEqual(blogAfter.length, blogBefore.length);

      const blogDeleted = await Blog.findById(blogToDelete);
      assert(blogDeleted !== null);
    });
  });

  // describe('update of a blog', () => {
  //   test('update title', async () => {
  //     const blogs = await helper.bloginDB();
  //     const blogToDelete = blogs[0];

  //     const updateBlog = {
  //       ...blogToDelete,
  //       title: 'new title for this blog',
  //     };

  //     await api.put(`/api/blogs/${blogToDelete.id}`).send(updateBlog).expect(200);

  //     const newBlogs = await helper.bloginDB();
  //     const titles = newBlogs.map((blog) => blog.title);
  //     assert(titles.includes('new title for this blog'));
  //   });
  // });

  after(async () => {
    await mongoose.connection.close();
  });
});
