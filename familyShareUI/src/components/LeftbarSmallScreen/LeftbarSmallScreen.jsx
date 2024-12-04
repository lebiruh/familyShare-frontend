
import { useEffect, useState } from "react";
import ProfilePic from "../../images/profile-picture.png"
import BannerPic from "../../images/banner.png"
import "./leftbarSmallScreen.css"
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



const LeftbarSmallScreen = ({isDisplayOpen, setIsDisplayOpen}) => {

  const [userData, setUserData] =useState(null)
  // const [isDisplayOpen, setIsDisplayOpen] = useState(false);
   const [isClicked, setIsClicked] = useState(false);
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false)


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
        {/* <div className="family_member_lists">
          <div className="members">
            <span className="members_title">Members</span>
            <span className="members_show">
              {
                isOpen ? <BiSolidUpArrow className="show" onClick={() => setIsOpen(false)}/> : <BiSolidDownArrow onClick={() => setIsOpen(true)} className="hide"/>
              }
            </span>
          </div>
          {
            isOpen && <ul>
              {
                groups?.data?.map((group, idx) => <li key={idx}>{group?.familyName}</li>)
              }
            </ul>
          }
          
        </div> */}
      </div>
    </div>
  )
}

export default LeftbarSmallScreen