
// import { useContext } from "react";
import { useEffect, useState } from "react";
import {AuthProvider} from "../../Context/AuthContext/AuthContext"
import { useAuth } from "../../helpers/useAuth";
import Leftbar from "../../components/Leftbar/Leftbar";
import Rightbar from "../../components/Rightbar/Rightbar";
import TimelineNavbar from "../../components/TimelineNavbar/TimelineNavbar";
import "./familyTimeline.css"
import HomeFamily from "../../components/HomeFamily/HomeFamily";
import { useNavigate } from "react-router-dom";



// eslint-disable-next-line react/prop-types
const FamilyTimeline = () => {

  const [userData, setUserData] = useState({});

  const {authData} = useAuth(AuthProvider);

  const navigate = useNavigate();

  useEffect(() => {

    setUserData(authData);

    if(!authData) {
    navigate('/')
  }

  }, [authData]);

  const userEmail = authData?.email;


  return (

    <div className="family_timeline_outer_container">
      <TimelineNavbar firstName={userData?.firstName}/>
      <div className="family_timeline_container">
        <Leftbar />
        <div className="family_timeline">
          <HomeFamily userEmail={userEmail}/>
        </div>

        <Rightbar />
      </div>
    </div>
  )
}

export default FamilyTimeline