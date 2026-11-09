import React from "react";
import { useState } from "react";
function Practice() {
  const [text, setText] = useState("Eguide");
  const changeText = () => {
    setText("Pro ");
  };
  function resetText() {
    setText("Eguide");
  }
  return (
    <>
      <h3>{text}</h3>
      <h1 onMouseOver={changeText} onMouseOut={resetText}>
        UseState
      </h1>
    </>
  );
}
export default Practice;
