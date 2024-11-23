import Axios from "axios";
import { toast, Slide } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const useAxios = () => {
  
  const navigate = useNavigate()

  //   const token = localStorage.getItem("token")
  //     ? localStorage.getItem("token")
  //     : "";

  // if(!token){
  //   navigate('/')
  // }

  const axios = Axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
      
    }
  });
  return { axios };
};
