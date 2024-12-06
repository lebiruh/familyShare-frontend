import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

export const addPost = async (postData) => {

  const userData = JSON.parse(localStorage.getItem('familyShareAuthData'))

  const token = userData?.token


  try {

    const response = await axios.post(`/api/post/${postData.familyId}`, postData, { headers: {'Authorization': `Bearer ${token}`}});

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
    const response = await axios.get(`/api/posts/${familyId}`, { headers: {'Authorization': `Bearer ${token}`}});

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
    const response = await axios.delete(`/api/deletePost/${postId}`, { headers: {'Authorization': `Bearer ${token}`}});

    const posts = response.data;

    return posts;

  } catch (error) {
    console.log(error);
  }

};