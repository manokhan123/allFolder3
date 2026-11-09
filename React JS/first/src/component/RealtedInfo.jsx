import React from "react";
import { useState } from "react";

const abdul = {
  name: "Abdul Rehman",
  city: "Dera ",
};

let arr = [1, 2, 3, 4, 5, 6];
export default function RealtedInfo() {
  const [count, setCount] = useState(1); //name for data store and setName is function to update that variable
  const handleCount = () => {
    //logic
    setCount(count + 1);
  };

  const myName = () => {}; // arrow function

  return (
    //html
    <div>
      <h1>{count}</h1>
      <button onClick={handleCount}>Change Name</button>
      <h3>{abdul.city}</h3>
    </div>
  );
}