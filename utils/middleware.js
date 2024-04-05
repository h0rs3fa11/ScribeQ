const logger = require('./logger');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:', request.path);
  logger.info('Body:', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

// eslint-disable-next-line consistent-return
const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } if (error.name === 'MongoServerError' && error.message.includes('duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' });
  } if (error.message.includes('password is invalid')) {
    return response.status(400).json({ error: error.message });
  } if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' });
  }

  next(error);
};

const userExtractor = async (request, response, next) => {
  const authorization = request.get('Authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.replace('Bearer ', '');

    const decodeToken = jwt.verify(token, process.env.SECRET);
    if (!decodeToken.id) {
      return response.status(401).json({ error: 'token invalid' });
    }

    const user = await User.findById(decodeToken.id);

    if (user === null) {
      return response.status(401).json({ error: 'user doesn not exist' });
    }

    request.user = user;
  }

  next();
};

module.exports = {
  requestLogger, unknownEndpoint, errorHandler, tokenExtractor, userExtractor,
};
