// import {Link} from "react-router-dom";
import EmailConfirmationForm from "../../components/emailConfirmationForm/EmailConfirmationForm"
import LoginHeader from "../../components/LoginHeader/LoginHeader"
import LoginFooter from "../../components/LoginFooter/LoginFooter"
import "./ConfirmEmail.css"

const ConfirmEmail = () => {
  return (
    <>
      <LoginHeader addClass="bg_gray"/>    
      <div className="confirmEmail_container">    
        <EmailConfirmationForm />
        <div className="confirmEmail_position_setter"></div>
      </div>
      <LoginFooter />
    </>
  )
}

export default ConfirmEmail