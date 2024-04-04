const {
  test, describe, after, beforeEach,
} = require('node:test');
const assert = require('node:assert');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');

const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

describe('when there is a initial user', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('asdfas', 10);

    const initUser = new User({
      username: 'root',
      passwordHash,
    });

    await initUser.save();
  });

  test('user info', async () => {
    await api.get('/api/users').expect(200).expect('Content-Type', /application\/json/);
  });

  test('creation succeed', async () => {
    const userAtStart = await helper.userInDB();

    const newUser = {
      username: 'mxuas',
      password: '12345678',
    };

    await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', /application\/json/);

    const userAtEnd = await helper.userInDB();

    assert.strictEqual(userAtStart.length + 1, userAtEnd.length);
    const usernames = userAtEnd.map((user) => user.username);

    assert(usernames.includes(newUser.username));
  });

  test('creation of a exist user should fail', async () => {
    const userAtStart = await helper.userInDB();
    const existUser = {
      username: 'root',
      password: '12345678',
    };

    const result = await api.post('/api/users').send(existUser).expect(400).expect('Content-Type', /application\/json/);

    const userAtEnd = await helper.userInDB();
    assert.strictEqual(userAtStart.length, userAtEnd.length);
    assert(result.body.error.includes('expected `username` to be unique'));
  });

  test('creation a user with password length less than 8 should fail', async() => {
    const userAtStart = await helper.userInDB();
    const existUser = {
      username: 'suka',
      password: '1234',
    };

    const result = await api.post('/api/users').send(existUser).expect(400).expect('Content-Type', /application\/json/);

    const userAtEnd = await helper.userInDB();
    assert.strictEqual(userAtStart.length, userAtEnd.length);
    assert(result.body.error.includes('password is invalid'));
  });

  test('creation a user with username length less than 3 characters should fail', async () => {
    const userAtStart = await helper.userInDB();
    const existUser = {
      username: 'su',
      password: '12345678',
    };

    await api.post('/api/users').send(existUser).expect(400).expect('Content-Type', /application\/json/);

    const userAtEnd = await helper.userInDB();
    assert.strictEqual(userAtStart.length, userAtEnd.length);
  });

  after(async () => { await mongoose.connection.close(); });
});
