import React from "react";
import Name from "./component/Name";
import Practice from "./component/Practice";
import "./App.css";
import Question from "./component/Question";
import Course from "./component/Course";
import RealtedInfo from "./component/RealtedInfo";
import BuildContext from "./component/BuildContext";

function App() {
  return (
    <>
      <Name />
      <Practice />
      <Question />
      <RealtedInfo />
      <Course Name="Abdu Rehman" city="Dera Ismail Khan" email="manokhan" />
      <BuildContext />
    </>
  );
}

export default App;
