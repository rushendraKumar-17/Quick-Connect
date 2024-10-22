/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Componets/Navbar.jsx";
import Home from "./Componets/Home.jsx";
import Login from "./Componets/Login.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Signup from "./Componets/Signup.jsx";
import Meeting from "./Componets/Meeting.jsx";
import Readypage from "./Componets/Readypage.jsx";

function App() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:8000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if(res.status === 200){
            navigate('/');
          }else{
            navigate('/login');
          }
        }).catch(e => console.log(e));
    }
    else{
      navigate("/login");
    }
  },[]);

  return (
    <>
      <Navbar />
      
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element = {<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/meet/:meetId/:role" element={<Meeting/>}/>
        <Route path = "/meet/join/:meetId/:role" element = {<Readypage />}/>
      </Routes>
    </>
  );
}

export default App;
