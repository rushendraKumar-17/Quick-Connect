/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";

import { useNavigate,Link } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/users/signin",{email,password}).then(res => {
        if(res.status === 200){
            localStorage.setItem('token',res.data.token);
            navigate("/home");
        }else{
            alert("Invalid credentials..");
        }
    }).catch(e => console.log(e));
  };
  const [email,setEmail] = useState(null);
  const [password,setPassword] = useState(null);
  return (
    <div className="main">
      <form>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" onChange={(e)=>setEmail(e.target.value)} required className="input"/>
        <br />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" onChange={(e)=>setPassword(e.target.value)} required className="input"/>
        <br />
        <br />
        <input type="submit" value="Login" onClick={handleSubmit} className="input"/>
        <br />
        <br />
        <p>Don&apos;t have an account?<Link to="/signup">Create One</Link></p>
      </form>
    </div>
  );
};

export default Login;
