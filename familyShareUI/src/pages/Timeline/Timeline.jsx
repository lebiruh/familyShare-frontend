
// import { useContext } from "react";
import { useEffect, useState } from "react";
import {AuthProvider} from "../../Context/AuthContext/AuthContext"
import { useAuth } from "../../helpers/useAuth";
import LeftbarGroup from "../../components/LeftbarGroup/LeftbarGroup";
import Rightbar from "../../components/Rightbar/Rightbar";
import TimelineNavbar from "../../components/TimelineNavbar/TimelineNavbar";
import Post from "../../components/Post/Post";
import Avatar from '@mui/material/Avatar';
import axios from "axios"
import "./timeline.css"
import { CircularProgress, Stack, TextField } from "@mui/material";
import { Image } from '@mui/icons-material'
import {
  // useQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { addPost, deletePost, getPosts } from "../../helpers/posts";
import { useParams } from "react-router-dom";





const Timeline = () => {

  const {familyGroupId} = useParams();

  const user = JSON.parse(localStorage.getItem('familyShareAuthData'))

  const {authData} = useAuth(AuthProvider);

  const [userData, setUserData] = useState({});

  const [postData, setPostData] = useState({userId: user.id, content: '', familyId: familyGroupId})

  const [file, setFile] = useState(null)

  
  
  
  
  // Access the client
  const queryClient = useQueryClient()
  
  useEffect(() => {

    setUserData(authData);
    
  }, [authData]);
  
  // const [postData, setPostData] = useState({userId: authData?.id, content: '', familyId: familyGroupId})


  // const baseURL = import.meta.env.VITE_BASE_URL;


  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await axios.post(`/api/upload`, formData);
      console.log("Upload data: " + res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }

  // Queries
  const query = useQuery({ queryKey: ['posts', familyGroupId], queryFn: () => getPosts(familyGroupId) })

  const handleChange = (e) => {
    setPostData(prev=> ({...prev, [e.target.name]: e.target.value}) );
  }

  const addPostMutation = useMutation({
      mutationFn: (postData) => addPost(postData),
      onSuccess: () => {queryClient.invalidateQueries({queryKey: ['posts', familyGroupId]})}
    })

  const deletePostsMutation = useMutation({
      mutationFn: ({postId}) => deletePost(postId),
      onSuccess: () => {queryClient.invalidateQueries({queryKey: ['posts', familyGroupId]})}
    })

  const handleDelete = (postId) => {

    deletePostsMutation.mutate({postId}); 
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("post");
    let imgUrl = "";
    if(file) imgUrl = await upload();
    addPostMutation.mutate({...postData, image: imgUrl});
    setPostData({userId: authData?.id, content: '', familyId: familyGroupId})
    setFile(null);
  }

 

  return (


    <div className="timeline_outer_container">
      <TimelineNavbar firstName={userData?.firstName}/>
      <div className="timeline_container">
        <LeftbarGroup />
        <div className="timeline">
          <div className="feed_container">
            <div className="add_post">
              <Avatar sx={{width: 30, height: 30}}/>
              <span>{userData?.firstName}</span>
            </div>
            <div className="text_area">
              <TextField sx={{width:'80%'}} id='standard-multiline-static' multiline rows={2} placeholder="What's on your mind?" variant='standard' name="content"
              value={postData.content}
              onChange={handleChange}/>
              {file && <img src={URL.createObjectURL(file)} alt="" style={{width: "50px", height: "50px", objectFit: "cover"}} />}
            </div>
            <Stack direction='row' mt={2} mb={3} pl={3} pr={3} alignItems="center" justifyContent="space-between">
              <Stack direction='row' gap={2} alignItems="center" justifyContent="center">              
                <input type="file" id="file" style={{display: "none"}} onChange={(e) => setFile(e.target.files[0])}/>
                <label htmlFor='file' >
                  <Image color='secondary' cursor='pointer' /> <span className="media">Media</span>
                </label>
                {/* <VideoCameraBack color='success' cursor='pointer'/> */}
              </Stack>
              <button onClick={handleSubmit}>Post</button>           
            </Stack>
          </div>          
          {
            query.isLoading ? 
            <CircularProgress /> :
            query.error ? 
            <h1>Error</h1> :
            query?.data.map((data, idx) => (
            <Post data = {data} userId={userData?.id} handleDelete={handleDelete} key={idx}/>
          ))
          }
        </div>

        <Rightbar />

      {/* { data ? (<p>User: {data?.firstName}</p>) : (<p>Please login</p>)} */}
      </div>
    </div>
  )
}

export default Timeline