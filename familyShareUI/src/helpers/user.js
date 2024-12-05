import axios from "axios"
// import {axiosInstance} from "../Api/axios"

// const baseURL = import.meta.env.VITE_BASE_URL;

export const getUserByEmail = async (userEmail) => {

  const userData = JSON.parse(localStorage.getItem('familyShareAuthData'))

  const token = userData?.token

  try {
    const response = await axios.get(`/api/users/find/${userEmail}`, { headers: {'Authorization': `Bearer ${token}`}})

    console.log("The user is:", response);

    return response;


  } catch (error) {
    // console.log(error.response.data);
    return error;
  }
};

export const getUserById = async (userId) => {

  const userData = JSON.parse(localStorage.getItem('familyShareAuthData'))

  const token = userData?.token

  try {
    const response = await axios.get(`/api/user/findById/${userId}`, { headers: {'Authorization': `Bearer ${token}`}})

    return response.data;


  } catch (error) {
    // console.log(error.response.data);
    return error;
  }
};