import axios from "axios";
const BASE_URI = import.meta.env.VITE_BASE_URL;

const login = async (credentials) => {
  const response = await axios.post(BASE_URI, credentials);
  return response.data;
};

export default { login };
