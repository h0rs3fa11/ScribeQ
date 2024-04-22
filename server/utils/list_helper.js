// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0;
  const result = blogs.reduce((total, item) => total + item.likes, 0);
  return result;
};

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  const result = blogs.reduce((acc, blog) => ((acc.likes > blog.likes) ? acc : blog));

  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
