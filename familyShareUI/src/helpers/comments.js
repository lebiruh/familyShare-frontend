import axios from 'axios';

const baseURL = "myfamilyshares-1256379681.us-east-2.elb.amazonaws.com"

export const getComments = async (postId) => {

  const userData = JSON.parse(localStorage.getItem('familyShareAuthData'))

  const token = userData?.token

  try {
    const response = await axios.get(`${baseURL}/api/comments/${postId}`, { headers: {'Authorization': `Bearer ${token}`}});

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
    const response = await axios.post(`${baseURL}/api/comments/${postId}`, newComment, { headers: {'Authorization': `Bearer ${token}`}});

    const posts = response.data;

    return posts;

  } catch (error) {
    console.log(error);
  }

};