import React from "react";
import { useState } from "react";
import { useContext, createContext } from "react";
const AuthContext = createContext();

function ContextConcept({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}

function LoginButton() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  return (
    <>
      <button className="btn" onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? "logout" : "login"}
      </button>
    </>
  );
}
function BuildContext() {
  return (
    <>
      <ContextConcept>
        <LoginButton />
      </ContextConcept>
    </>
  );
}
export default BuildContext;
