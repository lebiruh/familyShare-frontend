import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./pages/Login/Login"
import SignUp from "./pages/SignUp/SignUp"
import ConfirmEmail from "./pages/ConfirmEmail/ConfirmEmail";
import Timeline from "./pages/Timeline/Timeline"
import Home from "./pages/Home/Home";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<SignUp/>}/>
        <Route path="/confirm-email" element={<ConfirmEmail/>}/>
        <Route path="/timeline" element={<Timeline/>}/>
      </Routes>
    </Router>

  )
}

export default Routing