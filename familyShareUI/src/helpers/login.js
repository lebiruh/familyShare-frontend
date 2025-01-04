import axios from "axios"

const baseURL = "myfamilyshares-1256379681.us-east-2.elb.amazonaws.com"

export const login = async (loginData) => {

  try {

    const response = await axios.post(`${baseURL}/api/auth/login`, loginData);

    return response.data;

  } catch (error) {
    
    console.log(error);

  }
  
}