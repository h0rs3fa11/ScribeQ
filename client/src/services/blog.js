import axios from "axios";
const BASE_URI = import.meta.env.VITE_BASE_URL;
const blogURI = BASE_URI + '/api/blogs'
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async (authorId) => {
  const url = authorId ? `${blogURI}?author=${authorId}` : blogURI;
  const response = await axios.get(url);
  return response.data;
};

const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(blogURI, newBlog, config);
  return response.data;
};

const addLikes = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  // Get original likes
  const blog = await getOne(id);
  const updateContent = {
    likes: blog.likes + 1,
  };

  const response = await axios.put(`${blogURI}/${id}`, updateContent, config);
  return response.data;
};

const getOne = async (id) => {
  const response = await axios.get(`${blogURI}/${id}`);
  return response.data;
};

const getTopBlogs = async() => {
  const response = await axios.get(`${blogURI}/top-likes/5`);
  return response.data;
}

const deleteOne = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${blogURI}/${id}`, config);
  return response.data;
};

export default { getAll, createBlog, setToken, addLikes, getOne, deleteOne, getTopBlogs };
