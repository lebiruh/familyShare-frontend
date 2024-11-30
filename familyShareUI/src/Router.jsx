import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./pages/Login/Login"
import SignUp from "./pages/SignUp/SignUp"
import ConfirmEmail from "./pages/ConfirmEmail/ConfirmEmail";
import Timeline from "./pages/Timeline/Timeline"
import HomeManager from "./pages/HomeManager/HomeManager";
import FamilyTimeline from "./pages/FamilyTimeline/FamilyTimeline";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeManager/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<SignUp/>}/>
        <Route path="/confirm-email" element={<ConfirmEmail/>}/>
        <Route path="/family_group/:familyGroupId" element={<Timeline/>}/>
        <Route path="/family_group" element={<FamilyTimeline/>}/>
        <Route path="/profile/:id" element={<ProfilePage/>}/>
      </Routes>
    </Router>

  )
}

export default Routing