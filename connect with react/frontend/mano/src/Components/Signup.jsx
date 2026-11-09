import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await axios.post("http://localhost:8000/signupPost", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });



      


    // left waly schema  sy aarahy hai aur right waly upar form sy
    if (res.status == 200) {
      setFormData({
        name: "",
        email: "",
        password: "",
      });


      
      navigate('/login')
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Registration Form</h2>

        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          required={true}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          required={true}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          required={true}
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Signup;
