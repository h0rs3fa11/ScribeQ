import axios from "axios";
const BASE_URI = import.meta.env.VITE_BASE_URL;
const loginURL = BASE_URI + '/api/login'

const login = async (credentials) => {
  const response = await axios.post(loginURL, credentials);
  return response.data;
};

export default { login };
