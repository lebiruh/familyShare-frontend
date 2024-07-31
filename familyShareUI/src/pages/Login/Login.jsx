import LoginForm from "../../components/LoginForm/LoginForm"
import LoginHeader from "../../components/LoginHeader/LoginHeader"
import "./login.css"

const Login = () => {
  return (
    <>
      <LoginHeader />    
      <div className="login_container">    
        <LoginForm />
        <div className="join">
          New to familyShare?<span><a href="">Join now</a></span>
        </div>
        <div className="position_setter"></div>
      </div>
    </>
  )
}

export default Login