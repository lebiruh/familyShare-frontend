import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext/AuthContext";



export const useAuth = () => {
  return useContext(AuthContext);
}