import "./loginHeader.css"

// eslint-disable-next-line react/prop-types
const LoginHeader = ({addClass}) => {

  return (
    <header className={`login_header ${addClass}`}>
      <div className="login_header_logo">
        <span className="family">family</span><span className="share">Share</span>
      </div>      
    </header>
  )
}

export default LoginHeader