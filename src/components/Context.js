import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();
export const AppProvider = (props) => {
  const currentUser = localStorage.getItem("currentUser")
    ? localStorage.getItem("currentUser")
    : "";

  const currentToken = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
  const [loggedUser, setLoggedUser] = useState(currentUser);
  const [token, setToken] = useState(currentToken.value);
  console.log("Loged user", loggedUser);
  return (
    <AppContext.Provider
      value={{
        loggedUserCTX: [loggedUser, setLoggedUser],
        tokenCTX: [token, setToken],
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
