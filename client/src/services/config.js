import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;

const BASE_URI = process.env.NODE_ENV === 'test'
  ? `http://localhost:${PORT}`
  : '';

export default BASE_URI