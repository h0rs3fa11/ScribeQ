const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set('toJSON', {
  transform: (document, returnObject) => {
    // eslint-disable-next-line no-param-reassign, no-underscore-dangle
    returnObject.id = returnObject._id.toString();
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    delete returnObject._id;
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    delete returnObject.__v;
  },
});

module.exports = mongoose.model('Blog', blogSchema);
