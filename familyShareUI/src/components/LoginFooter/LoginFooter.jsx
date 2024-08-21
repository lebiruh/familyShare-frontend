
import "./loginFooter.css";

const date = new Date();

const LoginFooter = () => {
  return (
    <div className='footer_container'>
      {/* <div className='footer_inner_container'>
        <div className='footer_data'> */}
          <ul>
            <li className="copy_write"><span className="family">family</span><span className="share">Share</span> &copy; {date.getFullYear()}</li>
            <li>User Agreement</li>
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
            <li>Copyright Policy</li>
            <li>Send Feedback</li>
          </ul>
        {/* </div>        
      </div> */}
    </div>
  )
}

export default LoginFooter