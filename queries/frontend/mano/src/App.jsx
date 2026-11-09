import React from "react";
import axios from "axios";
import { useState } from "react";
const App = () => {
  const [findDta, setFindDta] = useState([]);
  const find = async () => {
    let data = await axios.get("http://localhost:8000/find");
    setFindDta(data.data);
  };
  return (
    <>
      {findDta.map((dta) => (
        <>
          <h1>{dta.name}</h1>
          <h4>{dta.email}</h4>

          <span>Age : {dta.age}</span>
        </>
      ))}
      <button onClick={find}>Find</button>
    </>
  );
};

export default App;
