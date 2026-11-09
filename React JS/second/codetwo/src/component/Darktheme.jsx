import React from "react";
import { useContext, createContext } from "react";
import { useState } from "react";
const DarkAuth = createContext();

function DarkThemeCode({ children }) {
  const [isDark, setIsDark] = useState(false);
  const divStyle = {
    backgroundColor: isDark ? "#1a1a1a" : "#ffffff",
    color: isDark ? "#ffffff" : "#1a1a1a",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };
  
  return (
    <>
      <DarkThemeCode.Provider value={{ isDark, setIsDark }}>
        <div style={divStyle}>{children}</div>
      </DarkThemeCode.Provider>
    </>
  );
}
function ToggleButton() {
  const { isDark, setIsDark } = useContext(DarkAuth);
  const btnStyle = {
    padding: "10px 20px",
    backgroundColor: isDark ? "#ffffff" : "#1a1a1a",
    color: isDark ? "#1a1a1a" : "#ffffff",
  };

  return (
    <>
      <button style={btnStyle} onClick={() => setIsDark(!isDark)}>
        {isDark ? "Light" : "Dark"}
      </button>
    </>
  );
}

const Darktheme = () => {
  return (
    <>
      <DarkThemeCode>
        <ToggleButton />
      </DarkThemeCode>
    </>
  );
};

export default Darktheme;
export { DarkAuth };
