
import { useState } from "react";
import ProfilePic from "../../images/profile-picture.png"
import BannerPic from "../../images/banner.png"
import "./LeftbarGroupSmallScreen.css"
import {
  useQuery,
} from '@tanstack/react-query';
import { getFamilies, getFamilyMembers } from "../../helpers/family";
import { useNavigate } from "react-router-dom";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
// import { IoMdAdd } from "react-icons/io";
import { MdAdd } from "react-icons/md";
import { useParams } from "react-router-dom";
import AddMember from "../AddMember/AddMember";



const LeftbarGroupSmallScreen = ({isDisplayOpen, setIsDisplayOpen}) => {

  const [userData] =useState(JSON.parse(localStorage.getItem('familyShareAuthData')) || null)
  const [isOpen, setIsOpen] = useState(false)
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)

  const {familyGroupId} = useParams();

  const navigate = useNavigate()

  // const userEmail = userData?.email

  const userId = userData?.id;
  
  const { data: groups} = useQuery({ queryKey: ["families", userId], queryFn: () => getFamilies(userId), enabled: !!userId })

  const familyGroup = groups?.data.filter(group => group?.Id === parseInt(familyGroupId));

  const displayName = (familyName) => {

    let name = ''

    if (familyName.length > 12) {
      for (let i = 0; i < 12; i++) {
        name += familyName[i];
      }
      return name += '...';
    } else return familyName;

  } 

  const displayFamilyName = displayName(familyGroup[0].familyName);

  const { data: members} = useQuery({ queryKey: ["familyMembers", familyGroupId], queryFn: () => getFamilyMembers(familyGroupId)})

  const handleClick = () => {
    // setIsDisplayOpen(false);
    document.body.style.overflow = 'auto'
    navigate('/family_group')
  }

  const handleAddMemberClick = () => {
    setIsAddMemberOpen(true)
    document.body.style.overflow = 'hidden'
  }
  
  const handleOuterDivClick = (e) => {
    e.stopPropagation();
    setIsDisplayOpen(false);
    document.body.style.overflow = 'auto'
  }

  const stopPropagation = (e) => {
    e.stopPropagation();
  }



  return (
    <div className={`leftbarGroup_smallScreen_leftbar_outer_container ${isDisplayOpen ? 'leftbar_group_active' : ''}`} onClick={handleOuterDivClick}>
    <div className="leftbarGroup_smallScreen_group_leftbar_container" onClick={stopPropagation}>
      <div className="leftbarGroup_smallScreen_group_profile_background_pic">
        <img src={BannerPic}/>
        <div className="leftbarGroup_smallScreen_group_profile_pic"><img src={ProfilePic}/></div>
      </div>
      <div className="leftbarGroup_smallScreen_group_profile_name">
        {
        userData ? <p><b>{userData.firstName}</b> <b>{userData.lastName}</b></p> : ""
        }
      </div>
      
      <div className="leftbarGroup_smallScreen_group_number_family_groups">
        <span className="leftbarGroup_smallScreen_group_groups" onClick={handleClick}> Groups </span> 
        <span className="leftbarGroup_smallScreen_group_groups_number"> 
          {
            groups?.data?.length
          }
        </span>
      </div>
      <div className="leftbarGroup_smallScreen_group_family_member_lists">
        <div className="leftbarGroup_smallScreen_group_members">
          <span className="leftbarGroup_smallScreen_group_members_title">Members ({displayFamilyName})</span>
          <span className="leftbarGroup_smallScreen_group_members_show" onClick={() => setIsOpen(!isOpen)}>
            {
              isOpen ? <BiSolidUpArrow className="leftbarGroup_smallScreen_group_show"/> : <BiSolidDownArrow className="leftbarGroup_smallScreen_group_hide"/>
            }
          </span>
        </div>
        {
          isOpen && <ul>
            <li className="leftbarGroup_smallScreen_add_member" onClick={handleAddMemberClick}> <span>Add member  </span> <MdAdd className="leftbarGroup_smallScreen_add_icon"/></li>
            {
              members?.data?.map((member, idx) => <li key={idx}>{member?.firstName}</li>)
            }
          </ul>
        }
        
      </div>
      
    </div>
      {
        isAddMemberOpen && <AddMember setIsAddMemberOpen={setIsAddMemberOpen} familyGroupId={familyGroupId}/>
      }
    </div>
  )
}

export default LeftbarGroupSmallScreen