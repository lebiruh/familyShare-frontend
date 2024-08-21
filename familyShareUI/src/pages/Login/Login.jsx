import {Link} from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm"
import LoginHeader from "../../components/LoginHeader/LoginHeader"
import LoginFooter from "../../components/LoginFooter/LoginFooter"
import "./login.css"

const Login = () => {
  return (
    <>
      <LoginHeader addClass="bg_white"/>    
      <div className="login_container">    
        <LoginForm />
        <div className="join">
          New to familyShare?<span><Link to="/register">Join now</Link></span>
        </div>
        <div className="login_position_setter"></div>
      </div>
      <LoginFooter />
    </>
  )
}

export default Login