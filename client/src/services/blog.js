import axios from "axios";
const BASE_URI = import.meta.env.VITE_BASE_URL;

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  console.log(BASE_URI)
  const response = await axios.get(BASE_URI);
  return response.data;
};

const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(BASE_URI, newBlog, config);
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

  const response = await axios.put(`${BASE_URI}/${id}`, updateContent, config);
  return response.data;
};

const getOne = async (id) => {
  const response = await axios.get(`${BASE_URI}/${id}`);
  return response.data;
};

const deleteOne = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${BASE_URI}/${id}`, config);
  return response.data;
};

export default { getAll, createBlog, setToken, addLikes, getOne, deleteOne };
