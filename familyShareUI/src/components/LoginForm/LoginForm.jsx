import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useMutation} from "@tanstack/react-query"
import { login } from "../../helpers/login";
import {AuthProvider} from "../../Context/AuthContext/AuthContext"
import "./loginForm.css"
import { useAuth } from "../../helpers/useAuth";

const LoginForm = () => {

  const [loginData, setLoginData] = useState({email: "", password: ""})
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [serverError, setServerError] = useState(false);

  const {setAuthData} = useAuth(AuthProvider)

  const navigate = useNavigate();

  const mutation = useMutation({

    mutationFn: login,

    onSuccess: (data) => {

      // setAuthData(data);
      localStorage.setItem('familyShareAuthData', JSON.stringify(data));

      setServerError(false);
      setEmailError(false);
      setPasswordError(false);

      setAuthData(JSON.parse(localStorage.getItem('familyShareAuthData')));

      navigate("/timeline")

    },
    onError: (error) => {
      setEmailError(false);
      setPasswordError(false);
      setServerError(true);
      console.log("Login failed: " + error);
    }
  })

  const handleChange = (e) => {    
    setLoginData((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loginData.email === "") {
      setEmailError(true);
      setPasswordError(false);
      setServerError(false);
      return;
    }

    if (loginData.password === "") {
      setPasswordError(true);
      setEmailError(false);
      setServerError(false);
      return;
    }

    mutation.mutate(loginData);

  }

  return (
    <section className="login_form_container">
      <div className="login_form_header_content">
        <h1>Sign in</h1>
        <p>Stay connected with your family.</p>
      </div>
      <form onSubmit={handleLogin} className="loginForm_container">
        {serverError && <div style={{color: "red", fontSize: "14px", fontWeight:"400"}}> Something went wrong. Please try again later. </div>}
        <div className="email_input">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Email" value={loginData.email} onChange={handleChange}/>
          {emailError && <div style={{color: "red", fontSize: "14px", fontWeight:"500"}}> Please enter an email address. </div>}
        </div>
        <div className="password_input">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Password" value={loginData.password} onChange={handleChange}/>
          {passwordError && <div style={{color: "red", fontSize: "14px", fontWeight:"500"}}> Please enter a password. </div>}
        </div>
        <div className="forgot_password">
          <a href="#">Forgot password?</a>
        </div>
        <div className="signin_container">
          <button type="submit" className="signin_btn">
            {mutation.isPending ? "Signing in..." : "Sign in" }
          </button>
        </div>
        <div className="separator">
          By clicking Continue, you agree to familyShare&apos;s <a href="#" >User Agreement</a>, <a href="#">Privacy Policy</a> and <a href="#">Cookie Policy</a>
        </div>
      </form>
    </section>
  )
}

export default LoginForm