import { useNavigate } from "react-router-dom";
// import { useAuth } from "./useAuth";

export const useLogout = () => {
  // const { dispatch } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    localStorage.removeItem("isLogged");
    localStorage.removeItem("sankara_admin_id");
    localStorage.removeItem("roles");
    localStorage.removeItem("hospital_id");
    localStorage.removeItem("email");
    localStorage.removeItem("company_name");
    localStorage.removeItem("phone_number");
    localStorage.removeItem("userMode");
    // SMt
    localStorage.removeItem("user_privileges");
    localStorage.removeItem("storemytruck_admin_id");
    localStorage.removeItem("role_name");
    localStorage.removeItem("role_id");

    console.log("hit logout");
    
    // dispatch({ type: "LOGOUT" });
    navigate("/log-in");
  };
  return { logout };
};
