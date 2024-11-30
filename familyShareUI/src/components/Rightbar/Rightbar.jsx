
import "./rightbar.css"

const date = new Date();

const Rightbar = () => {
  return (
    <div className="rightbar_container">
      <div>
        <ul>
          <li>User Agreement</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      <div>
        <ul>
          <li>Cookie Policy</li>
          <li>Copyright Policy</li>
        </ul>
      </div>
      <div>
        <ul>
          <li>Send Feedback</li>
        </ul>
      </div>
      <div className="rightbar_copyright">
        <span className="family">family</span><span className="share">Share</span> &copy; {date.getFullYear()}
      </div>
      
    </div>
  )
}

export default Rightbar