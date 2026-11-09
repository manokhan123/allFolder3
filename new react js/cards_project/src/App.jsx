import React, { useState } from "react";

function App() {
  const [num, setnum] = useState(0);

  function increaseNum() {
    setnum(num + 1);
  }

  function decreaseNum() {
    setnum(num - 1);
  }

  return (
    <>
      <h1>{num}</h1>
      <button onClick={increaseNum}>increase</button>
      <button onClick={decreaseNum}>decrease</button>
    </>
  );
}

export default App;
