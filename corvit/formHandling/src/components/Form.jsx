import React, { useState } from "react";

const Form = () => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [message, setMessage] = useState("");
  let [result, setResult] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(`  Name : ${name}   Email : ${email}Message : ${message} `);
  };
  
  return (
    <>
    
      <div>{result}</div>
      {/* <h1>Name: {name}</h1>
    <h2>Email : {email}</h2>
    <p>Message : {message}</p> */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          name="message"
          cols="10"
          rows="5"
          placeholder="Your message..."
        ></textarea>
        <input type="submit" id="btn" />
      </form> 
    </>
  );
};

export default Form;
