
import { useEffect } from "react";
import {AuthProvider} from "../../Context/AuthContext/AuthContext"
// import Login from "../Login/Login";
// import Timeline from "../Timeline/Timeline";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../helpers/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getFamilies } from "../../helpers/family";
import { Box } from "@mui/material";

const HomeManager = () => {

  const navigate = useNavigate();

  const {authData, isLoading} = useAuth(AuthProvider);

  const userId = authData?.id;

  const {data: families} = useQuery({ queryKey: ["families", userId], queryFn: () => getFamilies(userId), enabled: !!userId })

  const familyGroupId = families?.data[0]?.id;


  useEffect(() => {
    if (!isLoading) {
      if (authData && familyGroupId !== undefined) {
        navigate(`/family_group/${familyGroupId}`);
      } else if (authData && familyGroupId == undefined) {
        navigate("/family_group");
      } else {
        navigate('/login')
      }
    }
  }, [authData, isLoading, navigate, familyGroupId]);


  if(isLoading) {
    return (
    <Box sx={{ bgcolor: '#f3f2ef', minHeight: '100vh', width: '100vw', display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center"}}>
      Loading...
    </Box>
    )
  }
}

export default HomeManager