import axios from 'axios';

// const baseURL = import.meta.env.VITE_BASE_URL;

export const getFamilies = async (userId) => {

  const userData = JSON.parse(localStorage.getItem('familyShareAuthData'))

  const token = userData?.token

  try {
    const response = await axios.get(`/api/getFamily/${userId}`, {  headers: {'Authorization': `Bearer ${token}`}});

    return response;

  } catch (error) {
    console.log(error);
  }

};


export const getFamilyMembers = async (familyId) => {

  const userData = JSON.parse(localStorage.getItem('familyShareAuthData'))

  const token = userData?.token

  try {
    const response = await axios.get(`/api/getFamilyMembers/${familyId}`, {  headers: {'Authorization': `Bearer ${token}`}});

    return response;

  } catch (error) {
    console.log(error);
  }

};


export const addFamilyMember = async (familyId, userId) => {

  const userData = JSON.parse(localStorage.getItem('familyShareAuthData'))

  const token = userData?.token

  console.log(familyId, userId);

  try {
    const response = await axios.post(`/api/addFamilyMember/${familyId}`, {userId}, {  headers: {'Authorization': `Bearer ${token}`}});

    console.log(response);

    return response;

  } catch (error) {
    console.log(error.response.status);
    console.log(error);
    // return error;
  }

};

export const createFamily = async (familyName, userId) => {

  console.log("familyName on create family is: " + familyName);
  console.log("userId on create family is: " + userId);

  try {
    const response = await axios.post(`/api/createFamily/${userId}`, {familyName}, {  withCredentials: true});

    const family = response.data;

    console.log("Family Response is: ", response);

    console.log("Family data is: ", family);

    return response;

  } catch (error) {
    console.log(error);
  }

};

