import axios from 'axios';

const baseURL = "myfamilyshares-1256379681.us-east-2.elb.amazonaws.com"

export const addPost = async (postData) => {

  const userData = JSON.parse(localStorage.getItem('familyShareAuthData'))

  const token = userData?.token


  try {

    const response = await axios.post(`${baseURL}/api/post/${postData.familyId}`, postData, { headers: {'Authorization': `Bearer ${token}`}});

    const posts = response.data;

    return posts;

  } catch (error) {
    console.log(error);
  }

};


export const getPosts = async (familyId) => {

  const userData = JSON.parse(localStorage.getItem('familyShareAuthData'))

  const token = userData?.token

  try {
    const response = await axios.get(`${baseURL}/api/posts/${familyId}`, { headers: {'Authorization': `Bearer ${token}`}});

    const posts = response.data;

    return posts;

  } catch (error) {
    console.log(error);
  }

};

export const deletePost = async (postId) => {

  const userData = JSON.parse(localStorage.getItem('familyShareAuthData'))

  const token = userData?.token

  try {
    const response = await axios.delete(`${baseURL}/api/deletePost/${postId}`, { headers: {'Authorization': `Bearer ${token}`}});

    const posts = response.data;

    return posts;

  } catch (error) {
    console.log(error);
  }

};