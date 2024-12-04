import "./LogoutNavbar.css"
import { useNavigate } from "react-router-dom";

const LogoutNavbar = () => {

  const navigate = useNavigate()

  const handleLogoutClick = () => {
    localStorage.clear("familyShareAuthData");
    navigate('/login');
  }

  return (
    <div className="navbar_logout_container">
      <span className="navbar_logout_profile">Profile</span>
      <span className="navbar_logout" onClick={handleLogoutClick}>Logout</span>
    </div>
  )
}

export default LogoutNavbar