import axios from "axios";
const BASE_URI = import.meta.env.VITE_BASE_URL;
const userURI = BASE_URI + '/api/users'

const register = async (newUser) => {
  const response = await axios.post(userURI, newUser)
  return response.data
}

export default register