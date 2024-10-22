import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Readypage = () => {
  const {meetId} = useParams();
  const navigate = useNavigate();
  async function getMediaStream() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      document.getElementById("localVideo").srcObject = stream; // Display local video
      return stream;
    } catch (err) {
      console.error("Error accessing media devices.", err);
    }
  }
  useEffect(() => {
    getMediaStream();
  }, []);
  const handleJoin = async(e) => {
    navigate(`/meet/${meetId}/guest`);

  };
  return (
    <div>
      Ready to join meet....?
      <video
        id="localVideo"
        autoPlay
        playsInline
        style={{ width: "300px", height: "200px" }}
        ></video>
      <button onClick={handleJoin}>Join now</button>
    </div>
  );
};

export default Readypage;
