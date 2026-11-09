import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const [formData, setFormData] = useState({
 
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

    let res = await axios.post("http://localhost:8000/loginPost", {
     
      email: formData.email,
      password: formData.password,
    });
    // left waly schema  sy aarahy hai aur right waly upar form sy
    if (res.status == 200) {
      setFormData({
     
        email: "",
        password: "",
      });
   
      navigate('/home')
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Logi Form</h2>

      

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

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
