import axios from 'axios';

export const fetchUsers = async (query) => {

  const userData = JSON.parse(localStorage.getItem('familyShareAuthData'))

  const token = userData?.token

  if(query.startsWith(" ")) {
    return
  }

   try {

    const response = await axios.get(`/api/search?q=${query}`, { headers: {'Authorization': `Bearer ${token}`}});

    return response.data;

  } catch (error) {
    // console.log(error.response.data);
    return error;
  }

 
}