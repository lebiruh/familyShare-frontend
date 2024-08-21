
import { useEffect } from "react";
import {AuthProvider} from "../../Context/AuthContext/AuthContext"
// import Login from "../Login/Login";
// import Timeline from "../Timeline/Timeline";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../helpers/useAuth";

const Home = () => {

  const navigate = useNavigate();

  const {authData, isLoading} = useAuth(AuthProvider);

  useEffect(() => {
    if (!isLoading) {
      if (authData) {
        navigate("/timeline");
      } else {
        navigate("/login");
      }
    }
  }, [authData, isLoading, navigate]);


  return (
    <div>
    </div>
  )
}

export default Home