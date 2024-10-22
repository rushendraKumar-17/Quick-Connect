/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [roomId, setRoomId] = useState();
  console.log("First",roomId);
  const navigate = useNavigate();
  
  const handleJoin = (e) => {
    e.preventDefault();
    // axios.get(`http://localhost:8000/api/meeting/${meetId}`).then((res)=>{
    //   console.log(res);
    // })
    console.log("room id",roomId);
    console.log("here");
    navigate(`/meet/join/${roomId}/guest`);
    // navigate(`/meet/${roomId}`);
  };
  const handleCreateRoom = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:8000/api/meeting")
      .then((res) => {
        const meetId = res.data;
        console.log("Backend",meetId);
        navigate(`meet/${meetId}/host`)
      })
      .catch((e) => console.log(e));
  };
  return (
    <div>
      <label htmlFor="room">Enter room id:</label>
      <input
        type="text"
        name="room-id"
        id="room"
        onChange={(e) => setRoomId(e.target.value)}
        className="roomInput"
      />
      &nbsp;
      <button onClick={handleJoin} style={{ padding: "0.3vw" }}>
        Join
      </button>
      <br />
      <br />
      <button onClick={handleCreateRoom} style={{ padding: "1vw" }}>
        Create room
      </button>
    </div>
  );
};

export default Home;
