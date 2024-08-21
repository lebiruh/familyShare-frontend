import axios from "axios"
// import {axiosInstance} from "../Api/axios"

const baseURL = import.meta.env.VITE_BASE_URL;

export const signUp = async (signUpData) => {

  // console.log("login data is: ", signUpData);

  try {

    const response = await axios.post(`${baseURL}/api/confirm/email`, signUpData);

    // console.log("Response from API is: ", response.data);

    return response.data;

  } catch (error) {
    
    console.log("Caught error is: ", error);

    return error;

  }
  
}


export const register = async (registrationData) => {

  // console.log("login data is: ", signUpData);

  try {

    const response = await axios.post(`${baseURL}/api/auth/register`, registrationData);

    console.log("Registration data from API is: ", response.data);

    return response.data;

  } catch (error) {
    
    console.log("Caught error is: ", error);

    return error;

  }
  
}