import axios from 'axios';

export const fetchUsers = async (query) => {
  
  const response = await axios.get(`/api/search?q=${query}`);

  return response.data;
}