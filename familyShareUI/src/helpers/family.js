import axios from 'axios';

const baseURL = "myfamilyshares-1256379681.us-east-2.elb.amazonaws.com"


export const getFamilies = async (userId) => {

  const userData = JSON.parse(localStorage.getItem('familyShareAuthData'))

  const token = userData?.token

  try {
    const response = await axios.get(`${baseURL}/api/getFamily/${userId}`, {  headers: {'Authorization': `Bearer ${token}`}});

    return response;

  } catch (error) {
    console.log(error);
  }

};


export const getFamilyMembers = async (familyId) => {

  const userData = JSON.parse(localStorage.getItem('familyShareAuthData'))

  const token = userData?.token

  try {
    const response = await axios.get(`${baseURL}/api/getFamilyMembers/${familyId}`, {  headers: {'Authorization': `Bearer ${token}`}});

    return response;

  } catch (error) {
    console.log(error);
  }

};


export const addFamilyMember = async (familyId, userId) => {

  const userData = JSON.parse(localStorage.getItem('familyShareAuthData'))

  const token = userData?.token

  try {
    const response = await axios.post(`${baseURL}/api/addFamilyMember/${familyId}`, {userId}, {  headers: {'Authorization': `Bearer ${token}`}});

    return response;

  } catch (error) {
    return error;
  }

};

export const createFamily = async (familyName, userId) => {

  const userData = JSON.parse(localStorage.getItem('familyShareAuthData'))

  const token = userData?.token

  try {
    const response = await axios.post(`${baseURL}/api/createFamily/${userId}`, {familyName}, {  headers: {'Authorization': `Bearer ${token}`}});

    return response;

  } catch (error) {

    return error;
  }

};

