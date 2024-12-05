
import { useState } from "react";
import ProfilePic from "../../images/profile-picture.png"
import BannerPic from "../../images/banner.png"
import "./LeftbarGroup.css"
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



const LeftbarGroup = () => {

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

  const displayFamilyName = displayName(familyGroup?.[0]?.familyName || '');

  const { data: members} = useQuery({ queryKey: ["familyMembers", familyGroupId], queryFn: () => getFamilyMembers(familyGroupId)})

  const handleClick = () => {
    navigate('/family_group')
  }

  const handleAddMemberClick = () => {
    setIsAddMemberOpen(true)
    document.body.style.overflow = 'hidden'
  } 


  return (
    <>
    <div className="group_leftbar_container">
      <div className="group_profile_background_pic">
        <img src={BannerPic}/>
        <div className="group_profile_pic"><img src={ProfilePic}/></div>
      </div>
      <div className="group_profile_name">
        {
        userData ? <p><b>{userData.firstName}</b> <b>{userData.lastName}</b></p> : ""
        }
      </div>
      
      <div className="group_number_family_groups">
        <span className="group_groups" onClick={handleClick}> Groups </span> 
        <span className="group_groups_number"> 
          {
            groups?.data?.length
          }
        </span>
      </div>
      <div className="group_family_member_lists">
        <div className="group_members">
          <span className="group_members_title">Members ({displayFamilyName})</span>
          <span className="group_members_show" onClick={() => setIsOpen(!isOpen)}>
            {
              isOpen ? <BiSolidUpArrow className="group_show"/> : <BiSolidDownArrow className="group_hide"/>
            }
          </span>
        </div>
        {
          isOpen && <ul>
            <li className="add_member" onClick={handleAddMemberClick}> <span>Add member  </span> <MdAdd className="add_icon"/></li>
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
    </>
  )
}

export default LeftbarGroup