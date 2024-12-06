import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

export const getComments = async (postId) => {

  const userData = JSON.parse(localStorage.getItem('familyShareAuthData'))

  const token = userData?.token

  try {
    const response = await axios.get(`/api/comments/${postId}`, { headers: {'Authorization': `Bearer ${token}`}});

    const posts = response.data;

    return posts;

  } catch (error) {
    console.log(error);
  }

};

export const addComment = async (newComment) => {

  const postId = newComment.postId;

  const userData = JSON.parse(localStorage.getItem('familyShareAuthData'))

  const token = userData?.token


  try {
    const response = await axios.post(`/api/comments/${postId}`, newComment, { headers: {'Authorization': `Bearer ${token}`}});

    const posts = response.data;

    return posts;

  } catch (error) {
    console.log(error);
  }

};