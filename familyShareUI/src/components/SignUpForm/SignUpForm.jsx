import {Link, useNavigate} from "react-router-dom";
import "./signupForm.css"
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {signUp} from "../../helpers/signUp";
import {AuthProvider} from "../../Context/AuthContext/AuthContext";
import { useAuth } from "../../helpers/useAuth";

const SignUpForm = () => {

  const [signUpFormData, setSignUpFormData] = useState({userName: "", firstName: "", lastName: "", email: "", password: "", confirmPassword: ""})

  const {setSignUpData, setSignUpCode} = useAuth(AuthProvider);

  const [errorText, setErrorText] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [serverError, setServerError] = useState(false);

  const navigate = useNavigate();

  const mutation = useMutation({

    mutationFn: signUp,

    onSuccess: (data) => {

      setServerError(false);
      setEmailError(false);
      setPasswordError(false);

      // console.log("signUp success: ", data.response.status);
      console.log("signUp success data: ", data);

      if (data?.response?.status === 409) {
        setErrorText(data.response.data);
      } else {
        setSignUpData(signUpFormData);
        setSignUpCode(data.passCode);

        navigate("/confirm-email")
      }

      

    },
    onError: (err) => {
      setEmailError(false);
      setPasswordError(false);

      // if (err.response.status === 409) {
      //   setError(err.response);
      // }else {
        setServerError(true);
      // }  
      console.log("signUp failed: " + err);
    }
  })

  const handleChange = (e) => {    
    setSignUpFormData((prev) => ({...prev, [e.target.name]: e.target.value}))
  }


  const handleSignUp = async (e) => {
    e.preventDefault();

    if (signUpFormData.email === "") {
      setEmailError(true);
      setPasswordError(false);
      setServerError(false);
      return;
    }

    if ( signUpFormData.password !== signUpFormData.confirmPassword ) {
      setPasswordError(true);
      setEmailError(false);
      setServerError(false);
      return;
    }

    mutation.mutate(signUpFormData);

  }




  return (
     <section className="container">
      <div className="signup_form_header_content">
        <h1>Sign up</h1>
      </div>
      <form action="" className="signupForm_container" onSubmit={handleSignUp}>
        {serverError && <div style={{color: "red", fontSize: "14px", fontWeight:"400"}}> Something went wrong. Please try again later. </div>}
        {errorText && <div style={{color: "red", fontSize: "18px", fontWeight:"400"}}> User with this email address already exists! </div>}
        <div className="username_input">
          <label htmlFor="userName">Username</label>
          <input type="text" id="userName" name="userName" required value={signUpFormData.userName} onChange={handleChange}/>
        </div>
        <div className="firstname_input">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" name="firstName" required value={signUpFormData.firstName} onChange={handleChange}/>
        </div>
        <div className="lastname_input">
          <label htmlFor="lastName">Last name</label>
          <input type="text" id="lastname" name="lastName" required value={signUpFormData.lastName} onChange={handleChange}/>
        </div>
        <div className="signup_email_input">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required value={signUpFormData.email} onChange={handleChange}/>
          {emailError && <div style={{color: "red", fontSize: "14px", fontWeight:"500"}}> Please enter an email address. </div>}
        </div>
        <div className="signup_password_input">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required value={signUpFormData.password} onChange={handleChange}/>
        </div>
        <div className="signup_password_input">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" required value={signUpFormData.confirmPassword} onChange={handleChange}/>
          {passwordError && <div style={{color: "red", fontSize: "14px", fontWeight:"500"}}> Your passwords did not match. </div>}
        </div>
        <div className="separator">
          By clicking Agree & Join , you agree to familyShare&apos;s <a href="#" >User Agreement</a>, <a href="#">Privacy Policy</a> and <a href="#">Cookie Policy</a>
        </div>
        <div className="signup_btn_container">
          <button className="signup_btn">Agree & Join</button>
        </div>
        <div className="signin">
          Already on familyShare?<span><Link to="/">Sign in</Link></span>
        </div>
      </form>
    </section>
  )
}

export default SignUpForm