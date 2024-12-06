import axios from "axios"

const baseURL = import.meta.env.VITE_BASE_URL;

export const login = async (loginData) => {

  try {

    const response = await axios.post(`${baseURL}/api/auth/login`, loginData);

    return response.data;

  } catch (error) {
    
    console.log(error);

  }
  
}