
import { useEffect, useState } from "react";
import ProfilePic from "../../images/profile-picture.png"
import BannerPic from "../../images/banner.png"
import "./leftbarSmallScreen.css"
// import { useAuth } from "../../helpers/useAuth";
// import { AuthProvider } from "../../Context/AuthContext/AuthContext";
import {
  useQuery,
} from '@tanstack/react-query';
import { getFamilies } from "../../helpers/family";
import { useNavigate } from "react-router-dom";
import AddGroup from "../AddGroup/AddGroup";



const LeftbarSmallScreen = ({isDisplayOpen, setIsDisplayOpen}) => {

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
    setIsDisplayOpen(!isDisplayOpen);
    navigate('/family_group')
  }

  const handleOuterDivClick = (e) => {
    e.stopPropagation();
    setIsDisplayOpen(false);
  }

  const stopPropagation = (e) => {
    e.stopPropagation();
  }

  const handleAddGroupClick = () => {
  setIsAddGroupOpen(true)
  document.body.style.overflow = 'hidden'
  } 



  return (
   
    <div className="leftbar_smallScreen_leftbar_outer_container" onClick={handleOuterDivClick}>
      <div className={`leftbar_smallScreen_leftbar_container ${isDisplayOpen ? 'active' : ''}`} onClick={stopPropagation}>
        <div className="leftbar_smallScreen_profile_background_pic">
          <img src={BannerPic}/>
          <div className="leftbar_smallScreen_profile_pic"><img src={ProfilePic}/></div>
        </div>
        <div className="leftbar_smallScreen_profile_name">
          {
          userData ? <p><b>{userData.firstName}</b> <b>{userData.lastName}</b></p> : ""
          }
        </div>
        
        <div className="leftbar_smallScreen_number_family_groups">
          <span className="leftbar_smallScreen_groups" onClick={handleClick}> Groups </span> 
          <span className="leftbar_smallScreen_groups_number"> 
            {
              groups?.data?.length
            }
          </span>
        </div>
        <div className="leftbar_smallScreen_create_group_container">
          <span className="leftbar_smallScreen_create_group" onClick={handleAddGroupClick}>Create group</span>
        </div>
        {
          isAddGroupOpen && <AddGroup setIsAddGroupOpen={setIsAddGroupOpen} />
        } 
      </div>
    </div>
  )
}

export default LeftbarSmallScreen