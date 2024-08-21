import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useMutation} from "@tanstack/react-query"
// import { login } from "../../helpers/login";
import {AuthProvider} from "../../Context/AuthContext/AuthContext"
import "./emailConfirmationForm.css"
import { useAuth } from "../../helpers/useAuth";
import {register} from "../../helpers/signUp"

const EmailConfirmationForm = () => {

  const [registrationData, setRegistrationData] = useState({});
  const [emailConfrimationData, setEmailConfirmationData] = useState("");
  const [codeError, setCodeError] = useState(false);
  // const [passwordError, setPasswordError] = useState(false);
  const [serverError, setServerError] = useState(false);

  const {signUpData, signUpCode} = useAuth(AuthProvider);

  const navigate = useNavigate();

  useEffect(() => {

    setRegistrationData(signUpData);

  }, [registrationData, signUpData])

  const mutation = useMutation({

    mutationFn: register,

    onSuccess: () => {

      navigate("/login");
      
    },
    onError: () => {
      setServerError(true);
    }
  })

  const handleChange = (e) => {    
    setEmailConfirmationData(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailConfrimationData) return;
    if (parseInt(emailConfrimationData) !== signUpCode) {
      setCodeError(true);
      return;
    }

    mutation.mutate(registrationData);

  }

  return (
    <section className="confirmation_form_container">
      <div className="confirmation_form_header_content">
        <h1>Confirm your email</h1>
        <p>Please enter the code that was sent to your email.</p>
      </div>
      <form onSubmit={handleSubmit} className="confirmationForm_container">
        {serverError && <div style={{color: "red", fontSize: "14px", fontWeight:"400"}}> Something went wrong. Please try again later. </div>}
        <div className="code_input">
          <label htmlFor="code">Enter code</label>
          <input type="number" id="code" name="code" placeholder="Enter code" value={emailConfrimationData} onChange={handleChange}/>
          {codeError && <div style={{color: "red", fontSize: "14px", fontWeight:"500"}}> The code you entered is not correct. </div>}
        </div>
        
        <div className="submit_container">
          <button type="submit" className="submit_btn">
            {mutation.isPending ? "Submitting..." : "Submit" }
          </button>
        </div>
      </form>
    </section>
  )
}

export default EmailConfirmationForm