
import { useEffect, useState } from "react";
import ProfilePic from "../../images/profile-picture.png"
import BannerPic from "../../images/banner.png"
import "./leftbar.css"
// import { useAuth } from "../../helpers/useAuth";
// import { AuthProvider } from "../../Context/AuthContext/AuthContext";
import {
  useQuery,
} from '@tanstack/react-query';
import { getUserByEmail } from "../../helpers/user";
import { getFamilies } from "../../helpers/family";
import { useNavigate } from "react-router-dom";
// import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { useParams } from "react-router-dom";
import AddGroup from "../AddGroup/AddGroup";



const Leftbar = () => {

  const [userData, setUserData] =useState(null)
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false)

  // const [isOpen, setIsOpen] = useState(false)


  // const {authData} = useAuth(AuthProvider);
  const {familyGroupId} = useParams();

  const navigate = useNavigate()

  useEffect(() => {
    const storedData = localStorage.getItem('familyShareAuthData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const userEmail = userData?.email

  // const userEmail = JSON.parse(localStorage.getItem('familyShareAuth'))?.email
  console.log("userParam on leftbar is: " + familyGroupId);

  console.log("userEmail: " + userEmail);

  const { data: user } = useQuery({ queryKey: ["user", userEmail], queryFn: () => getUserByEmail(userEmail) })

  console.log("userData for family frontend is: ", user);

  const userId = userData?.id;

  console.log("userId: " + userId);

  
  const { data: groups} = useQuery({ queryKey: ["families", userId], queryFn: () => getFamilies(userId), enabled: !!userId })

  console.log("data is: ", groups);

  const handleClick = () => {
    navigate('/family_group')
  }

  const handleAddGroupClick = () => {
  setIsAddGroupOpen(true)
  document.body.style.overflow = 'hidden'
  } 



  return (
    <div className="leftbar_container">
      <div className="profile_background_pic">
        <img src={BannerPic}/>
        <div className="profile_pic"><img src={ProfilePic}/></div>
      </div>
      <div className="profile_name">
        {
        userData ? <p><b>{userData.firstName}</b> <b>{userData.lastName}</b></p> : ""
        }
      </div>
      
      <div className="number_family_groups">
        <span className="groups" onClick={handleClick}> Groups </span> 
        <span className="groups_number"> 
          {
            groups?.data?.length
          }
        </span>
      </div>
      <div className="leftbar_create_group_container">
        <span className="leftbar_create_group" onClick={handleAddGroupClick}>Create group</span>
      </div>
      {
        isAddGroupOpen && <AddGroup setIsAddGroupOpen={setIsAddGroupOpen} userId={userId}/>
      }    
    </div>
  )
}

export default Leftbar