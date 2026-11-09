import React from "react";

const Card = (props) => {
  return (
    <div className="card">
      <h1>
        Welcome to {props.user} and {props.age} years old
      </h1>
      <p>This is a simple React app.</p>
      <a href="">view more</a>
    </div>
  );
};

export default Card;
