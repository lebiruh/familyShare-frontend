
// import { useContext } from "react";
import {AuthProvider} from "../../Context/AuthContext/AuthContext"
import { useAuth } from "../../helpers/useAuth";
import "./timeline.css"



const Timeline = () => {

  // console.log("Timeline: ", useAuth(AuthProvider));

  const {authData} = useAuth(AuthProvider);

  console.log("Timeline: ", authData);

  return (
    <div>
      <h1>Wlecome home</h1>
      {
        authData ? (
          <p>User: {authData.firstName}</p>
        ) : (
          <p>Please login</p>
        )
      }

     {/* { data ? (<p>User: {data?.firstName}</p>) : (<p>Please login</p>)} */}
    </div>
  )
}

export default Timeline