import SignUpForm from "../../components/SignUpForm/SignUpForm"
import LoginHeader from "../../components/LoginHeader/LoginHeader"
import LoginFooter from "../../components/LoginFooter/LoginFooter"
import "./signup.css"

const SignUp = () => {
  return (
    <>
      <LoginHeader addClass="bg_gray" />    
      <div className="signup_container">    
        <SignUpForm />
      </div>
      <LoginFooter />
    </>
  )
}

export default SignUp