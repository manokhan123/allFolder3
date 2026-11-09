import React from "react";
import proeguide from "../assets/person.jpg";
function Course(props) {
  return (
    <>
      <h1>{props.Name}</h1>
      <p>{props.city}</p>
      <span>{props.email}</span>

      <img src={proeguide} alt="Img" height={500} width={500} />
      <button className="btn">Click me</button>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" placeholder="write name" />
    </>
  );
}
export default Course;
