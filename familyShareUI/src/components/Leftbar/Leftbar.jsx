
import { useEffect, useState } from "react";
import ProfilePic from "../../images/profile-picture.png"
import BannerPic from "../../images/banner.png"
import "./leftbar.css"
import {
  useQuery,
} from '@tanstack/react-query';
// import { getUserByEmail } from "../../helpers/user";
import { getFamilies } from "../../helpers/family";
import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
import AddGroup from "../AddGroup/AddGroup";



const Leftbar = () => {

  const [userData, setUserData] =useState(null)
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const storedData = localStorage.getItem('familyShareAuthData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const userId = userData?.id;
  
  const { data: groups} = useQuery({ queryKey: ["families", userId], queryFn: () => getFamilies(userId), enabled: !!userId })

  const handleClick = () => {
    navigate('/family_group')
  }

  const handleAddGroupClick = () => {
  setIsAddGroupOpen(true);
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
        isAddGroupOpen && <AddGroup setIsAddGroupOpen={setIsAddGroupOpen} />
      }    
    </div>
  )
}

export default Leftbar