import { createContext, useEffect, useReducer } from "react";

const AuthContext = createContext({});

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return { user: state };
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  // console.log("STATESSSSSSSSS=======", state);

  useEffect(() => {
    // var storedNames = JSON.parse(localStorage.getItem("roles"));
    let data = {
      username: localStorage.getItem("name"),
      token: localStorage.getItem("token"),
      roles: JSON.parse(localStorage.getItem("roles"))
    };
    if (data) {
      dispatch({ type: "LOGIN", payload: data });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
