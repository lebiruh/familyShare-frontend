import axios from "axios"
// import {axiosInstance} from "../Api/axios"

const baseURL = import.meta.env.VITE_BASE_URL;

export const login = async (loginData) => {

  console.log("login data is: ", loginData);

  try {

    const response = await axios.post(`${baseURL}/api/auth/login`, loginData);

    return response.data;

  } catch (error) {
    
    console.log("Caught error is: ", error);

  }
  
}