
// import { useContext } from "react";
import { useEffect, useState } from "react";
import {AuthProvider} from "../../Context/AuthContext/AuthContext"
import { useAuth } from "../../helpers/useAuth";
import Leftbar from "../../components/Leftbar/Leftbar";
import Rightbar from "../../components/Rightbar/Rightbar";
import TimelineNavbar from "../../components/TimelineNavbar/TimelineNavbar";
// import Avatar from '@mui/material/Avatar';
// import axios from "axios"
import "./familyTimeline.css"
// import { Stack, TextField } from "@mui/material";
// import { Image } from '@mui/icons-material'
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
// import { addPost } from "../../helpers/posts";
// import { useParams } from "react-router-dom";
import { getUserByEmail } from "../../helpers/user";
import HomeFamily from "../../components/HomeFamily/HomeFamily";
import { useNavigate } from "react-router-dom";



// eslint-disable-next-line react/prop-types
const FamilyTimeline = () => {

  const [userData, setUserData] = useState({});

  // const [file, setFile] = useState(null)

  // const [postData, setPostData] = useState({userId: userId, content: '', familyId: familyId})

  const {authData} = useAuth(AuthProvider);

  // const {familyGroupId} = useParams();

  // console.log("familyGroupId is: ", familyGroupId);

  const navigate = useNavigate();

  // Access the client
  // const queryClient = useQueryClient()

  useEffect(() => {

    setUserData(authData);

    if(!authData) {
    navigate('/')
  }

  }, [authData]);

  console.log("User data is: ", authData);

  const userEmail = authData?.email;


  const { data: user } = useQuery({ queryKey: ["user", userEmail], queryFn: () => getUserByEmail(userEmail), enabled: !!userEmail })

  // const userId = user?.data?.id;  

  console.log("User from server is: ", user);


  


  return (


    <div className="family_timeline_outer_container">
      <TimelineNavbar firstName={userData?.firstName}/>
      <div className="family_timeline_container">
        <Leftbar />
        <div className="family_timeline">
          <HomeFamily userEmail={userEmail}/>
        </div>

        <Rightbar />

      {/* { data ? (<p>User: {data?.firstName}</p>) : (<p>Please login</p>)} */}
      </div>
    </div>
  )
}

export default FamilyTimeline