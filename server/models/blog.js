const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  // author: { type: String, required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
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
