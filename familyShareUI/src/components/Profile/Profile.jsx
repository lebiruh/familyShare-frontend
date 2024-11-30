import TimelineNavbar from "../TimelineNavbar/TimelineNavbar";
import { useParams } from "react-router-dom";
import "./profile.css"
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../helpers/user";
import BannerPic from "../../images/banner.png";
import ProfilePic from "../../images/profile-picture.png";
import "./profile.css";



const Profile = () => {

  const {id} = useParams();
  // Queries
  const {data: user} = useQuery({ queryKey: ['user', id], queryFn: () => getUserById(id)})

  return (
    <div className="profile_outer_container">    
      <TimelineNavbar />
      <div className="profile_container">
        <div className="profile">
          <div className="profile_background_pic">
            <img className='profile_banner' src={BannerPic}/>
            {/* <div className="profile_pic"> */}
            <img className="profile_pic" src={ProfilePic}/>
            {/* </div> */}
          </div>
          <div className="profile_name">
            {
              user && <><span>{user[0]?.firstName} </span> <span>{user[0]?.lastName}</span> </>
            }            
                     
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile