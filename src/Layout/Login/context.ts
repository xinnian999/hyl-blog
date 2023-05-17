import React from "react";

type LoginContextType = {
  setType: (type: "login" | "register" | "wx") => any;
};

const LoginContext = React.createContext<LoginContextType>({
  setType: () => {},
});

export default LoginContext;
