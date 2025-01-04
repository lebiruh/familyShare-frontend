import axios from 'axios';


const baseURL = "myfamilyshares-1256379681.us-east-2.elb.amazonaws.com"

export const getLikes = async (postId) => {

  const userData = JSON.parse(localStorage.getItem('familyShareAuthData'))

  const token = userData?.token

  try {
    const response = await axios.get(`${baseURL}/api/getlikes/${postId}`, { headers: {'Authorization': `Bearer ${token}`}});

    const likes = response.data;

    return likes;

  } catch (error) {
    console.log(error);
  }

};
export const addLike = async (postId, userId) => {

  const userData = JSON.parse(localStorage.getItem('familyShareAuthData'))

  const token = userData?.token

  try {
    const response = await axios.post(`${baseURL}/api/addlike/${postId}`, {userId}, { headers: {'Authorization': `Bearer ${token}`}});

    const likes = response.data;

    return likes;

  } catch (error) {
    console.log(error);
  }

};

export const removeLike = async (postId, userId) => {

  const userData = JSON.parse(localStorage.getItem('familyShareAuthData'))

  const token = userData?.token

  try {
    const response = await axios.post(`${baseURL}/api/removelike/${postId}`, {userId}, { headers: {'Authorization': `Bearer ${token}`}});


    const likes = response.data;

    return likes;

  } catch (error) {
    console.log(error);
  }

};