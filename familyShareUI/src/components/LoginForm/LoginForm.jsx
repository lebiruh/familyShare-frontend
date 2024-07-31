import "./loginForm.css"

const LoginForm = () => {
  return (
    <section className="container">
      <div className="login_form_header_content">
        <h1>Sign in</h1>
        <p>Stay connected with your family.</p>
      </div>
      <form action="" className="loginForm_container">
        <div className="email_input">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Email"/>
        </div>
        <div className="password_input">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Password"/>
        </div>
        <div className="forgot_password">
          <a href="#">Forgot password?</a>
        </div>
        <div className="signin_container">
          <button className="signin_btn">Sign in</button>
        </div>
        <div className="separator">
          By clicking Continue, you agree to familyShare&apos;s <a href="#" >User Agreement</a>, <a href="#">Privacy Policy</a> and <a href="#">Cookie Policy</a>
        </div>
      </form>
    </section>
  )
}

export default LoginForm