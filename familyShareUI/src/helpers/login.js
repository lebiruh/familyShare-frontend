import axios from "axios"

export const login = async (loginData) => {

  try {

    const response = await axios.post(`/api/auth/login`, loginData);

    return response.data;

  } catch (error) {
    
    console.log(error);

  }
  
}