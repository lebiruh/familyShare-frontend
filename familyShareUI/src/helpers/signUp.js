import axios from "axios"
// import {axiosInstance} from "../Api/axios"

const baseURL = "myfamilyshares-1256379681.us-east-2.elb.amazonaws.com"

export const signUp = async (signUpData) => {

  try {

    const response = await axios.post(`${baseURL}/api/confirm/email`, signUpData);

    return response.data;

  } catch (error) {

    return error;

  }
  
}


export const register = async (registrationData) => {

  try {

    const response = await axios.post(`${baseURL}/api/auth/register`, registrationData);

    return response.data;

  } catch (error) {

    return error;

  }
  
}