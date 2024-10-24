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
    <div className="flex h-full items-center justify-center">
      <div className="bg-gray-100 p-10">
      <form>
        <h1 className="text-2xl mb-3 text-center">Login</h1>
        <label htmlFor="email" className="block">Email:</label>
        <input type="email" id="email" name="email" onChange={(e)=>setEmail(e.target.value)} required className="border border-gray-500 rounded-md p-1"/>
        <br />
        <label htmlFor="password" className="block">Password:</label>
        <input type="password" id="password" name="password" onChange={(e)=>setPassword(e.target.value)} required className="border border-gray-500 rounded-md p-1"/>
        <br />
        <br />
        <button onClick={handleSubmit} className="border rounded-xl bg-gray-200 border-black px-2 text-center hover:bg-gray-50">Login</button>
        <br />
        <br />
        <p>Don&apos;t have an account?<Link to="/signup" className="underline text-blue-600">Create One</Link></p>
      </form>
      </div>
    </div>
  );
};

export default Login;
