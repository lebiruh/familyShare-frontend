import axios from 'axios';


// const baseURL = import.meta.env.VITE_BASE_URL;

export const getLikes = async (postId) => {

  const userData = JSON.parse(localStorage.getItem('familyShareAuthData'))

  const token = userData?.token

  try {
    const response = await axios.get(`/api/getlikes/${postId}`, { headers: {'Authorization': `Bearer ${token}`}});

    const likes = response.data;

    console.log("get likes: " + JSON.stringify(likes));

    return likes;

  } catch (error) {
    console.log(error);
  }

};
export const addLike = async (postId, userId) => {

  const userData = JSON.parse(localStorage.getItem('familyShareAuthData'))

  const token = userData?.token

  try {
    const response = await axios.post(`/api/addlike/${postId}`, {userId}, { headers: {'Authorization': `Bearer ${token}`}});

    const likes = response.data;

    console.log("likes: " + likes);

    return likes;

  } catch (error) {
    console.log(error);
  }

};

export const removeLike = async (postId, userId) => {

  const userData = JSON.parse(localStorage.getItem('familyShareAuthData'))

  const token = userData?.token

  console.log(`This is the remove like mutation. Post ${postId} is disliked by ${userId}`);

  try {
    const response = await axios.post(`/api/removelike/${postId}`, {userId}, { headers: {'Authorization': `Bearer ${token}`}});


    const likes = response.data;

    return likes;

  } catch (error) {
    console.log(error);
  }

};