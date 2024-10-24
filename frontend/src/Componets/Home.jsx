import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const socket = useSocket();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [roomId, setRoomId] = useState("");
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, roomId });
    },
    [roomId, email, socket]
  );
  const handleJoinRoom = useCallback((data)=>{
    const {email,roomId} = data;
    console.log(email,roomId);
    navigate(`/meet/${roomId}`);

  },[navigate]);
  useEffect(()=>{
    socket.on("room:join",handleJoinRoom);
    return ()=>{
      socket.off('room:join',handleJoinRoom);
    }
  },[socket]);
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "30vw",
          height: "25vw",
          border: "1px solid black",
          margin: "5vh auto",
          padding: "2vw",
          display: "flex",
          flexDirection: "column",
          gap: "2vh",
        }}>
        <h1 style={{ textAlign: "center" }}>Login</h1>
        Email :
        <input
          type="email"
          name="email"
          id="email"
          style={{ width: "20vw", height: "4vh", margin: "0vw 0vw 0vw 1vw" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        room id:
        <input
          type="text"
          name="roomId"
          id="room"
          style={{ width: "20vw", height: "4vh", margin: "0vw 0vw 0vw 1vw" }}
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <br />
        <input
          type="submit"
          value="Join Room"
          style={{ width: "8vw", height: "3vw", margin: "auto" }}
        />
      </form>
    </div>
  );
};

export default Home;