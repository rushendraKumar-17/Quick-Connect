import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import peer from "../Services/peer.js";
import { useSocket } from "../context/SocketProvider";

const Meeting = () => {
  const socket = useSocket();
  const { meetId, role } = useParams(); // 'host' or 'guest'
  const [myStream, setMyStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [remoteSocketId, setRemoteSocketId] = useState(null);

  async function getMediaStream() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      return stream;
    } catch (err) {
      console.error("Error accessing media devices.", err);
    }
  }

  const createOffer = async () => {
    const offer = await peer.getOffer();
    return offer;
  };

  const handleOffer = async (offer) => {
    const answer = await peer.getAnswer(offer);
    socket.emit("answer", answer);
    socket.setLocalDescription(answer);
    socket.setRemoteDescription(offer);

  };


  useEffect(() => {
    getMediaStream().then((stream) => {
      setMyStream(stream);
      const localVideo = document.getElementById("localVideo");
      localVideo.srcObject = stream;
  
      peer.setLocalDescription(stream);
  
      // Listen for remote stream
      peer.onTrack((remoteStream) => {
        setRemoteStream(remoteStream);
        const remoteVideo = document.getElementById("remoteVideo");
        remoteVideo.srcObject = remoteStream;
      });
  
      if (role === "host") {
        createOffer().then((offer) => {
          socket.on("user:joined", (s) => {
            console.log(s);
            setRemoteSocketId(s.id);
            socket.emit("offer", offer);
          });
        });
        socket.on("answer", (answer) => peer.setRemoteDescription(answer));
      } else {
        socket.emit("user:joined", "rushi");
        socket.on("offer", handleOffer);
      }
    });
  }, []);
  
  return (
    <div
      style={{
        backgroundColor: "black",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
      }}>
      <p>Meeting {meetId}</p>

      <br />
      {myStream && (
        <div>
          <h3>Local video</h3>
          <video
            id="localVideo"
            autoPlay
            muted
            style={{ width: "300px", height: "300px" }}></video>
        </div>
      )}
      {remoteStream && (
        <div>
          <h3>Remote stream</h3>
          <video
            id="remoteVideo"
            autoPlay
            style={{ width: "300px", height: "300px" }}></video>
        </div>
      )}
    </div>
  );
};

export default Meeting;
