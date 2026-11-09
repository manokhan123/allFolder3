import React, { useState } from "react";
import { Bs1SquareFill } from "react-icons/bs";
function Question() {
  const [color, setColor] = useState({ backgroundColor: "grey" });
  const [text, setText] = useState("Abdul");
  const handleText = () => {
    setText("REHMAN");
  };
  const handleColor = () => {
    setColor({ backgroundColor: "yellow" });
  };

  const btnStyle = {
    padding: "10px",
    backgroundColor: "yellow",
    color: "black",
  };

  return (
    <>
      <Bs1SquareFill />
      <div
        onMouseOver={handleColor}
        className="mydiv"
        style={color}
        onClick={handleText}
      >
        {text}
      </div>
      <button
        style={{
          padding: "10px",
          backgroundColor: "lightgray",
          color: "black",
        }}
      >
        main button
      </button>
      <button style={btnStyle}>Second button </button>
    </>
  );
}
export default Question;
