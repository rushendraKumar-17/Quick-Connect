/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Signup = () => {
    const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password && name) {
      axios
        .post("http://localhost:8000/api/users/signup", {
          uname: name,
          email,
          password,
        })
        .then((res) => {
            if(res.status === 200){
                navigate("/login");
            }
            else{
                console.log(res);
            }
        })
        .catch((e) => console.log(e));
    }
  };
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  return (
    <div className="main">
      <form>
        <label htmlFor="email">Name:</label>
        <input className = "inputField"
          type="text"
          id="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input className = "inputField"
          type="email"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input className = "inputField"
          type="password"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <br />
        <input className = "inputField" type="submit" value="Signup" onClick={handleSubmit} />
        <br />
        <br />
      </form>
    </div>
  );
};

export default Signup;
