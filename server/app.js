const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
require('express-async-errors');

const app = express();
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./utils/config');
const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/user');
const loginRouter = require('./controllers/login');
const searchRouter = require('./controllers/search');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to mongodb');
  })
  .catch((error) => {
    logger.info('error connecting to mongodb', error.message);
  });

app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(express.static(path.join(__dirname, "/dist")));
}
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.userExtractor);

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/search', searchRouter);
if (process.env.NODE_ENV === 'test') {
  // eslint-disable-next-line global-require
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
