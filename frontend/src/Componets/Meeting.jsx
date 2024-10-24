import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import ReactPlayer from "react-player";
import peer from "../Services/peer";
const Meeting = () => {
  const socket = useSocket();
  const [myStream, setMyStream] = useState(null);
  const [remoteStream,setRemoteStream] = useState(null);
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);
  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);

  }, [remoteSocketId,socket]);
  const handleIncomingCall = useCallback(async({ from, offer }) => {
    console.log("Incoming call from : ", from, offer);
    setRemoteSocketId(from);
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream);

    const ans = await peer.getAnswer(offer);
    socket.emit('call:accepted',{to:from,ans})
  }, [socket]);
  const sendStreams = useCallback(() =>{
    for(const track of myStream.getTracks()){
      peer.peer.addTrack(track,myStream);
    }
  },[myStream]);
  const handleCallAccepted = useCallback(({from,ans})=>{
    peer.setLocalDescription(ans);
    console.log(`Call Accepted!`);
    sendStreams();
  },[sendStreams]);
  const handleNegoNeedFinal = useCallback(async({ans})=>{
    await peer.setLocalDescription(ans);
  },[])
const handleNegoNeeded = useCallback(async()=>{
  const offer = await peer.getOffer();
  socket.emit("peer:nego:needed",{offer,to:remoteSocketId})
},[]);
const handleNegoNeedIncoming = useCallback(({from,offer})=>{
  const ans = peer.getAnswer(offer);
  socket.emit("peer:nego:done",{to:from,ans})
},[]);
  useEffect(()=>{
    peer.peer.addEventListener('negotiationneeded',handleNegoNeeded)
    return ()=>{
      peer.peer.removeEventListener("negotiationneeded",handleNegoNeeded);
    }
  },[])

  useEffect(()=>{
    peer.peer.addEventListener('track',async ev =>{
      const remoteStream = ev.streams;
      console.log('Got TRacks!!!');
      setRemoteStream(remoteStream);
    })
  },[])
  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incoming:call", handleIncomingCall);
    socket.on("call:accepted",handleCallAccepted);
    socket.on("peer:nego:needed",handleNegoNeedIncoming);
    socket.on('peer:neo:final',handleNegoNeedFinal);
    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incoming:call", handleIncomingCall);
    socket.off("call:accepted",handleCallAccepted);
    socket.off("peer:nego:needed",handleNegoNeedIncoming);
    socket.off('peer:neo:final',handleNegoNeedFinal);

    };
  }, [socket, handleUserJoined, handleIncomingCall,handleCallAccepted]);
  return (
    <div>
      <h1>Meeting</h1>
      <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
      {remoteSocketId && <button onClick={handleCallUser}>CALL</button>}
      {myStream && (
        <div>
          <h2>My Stream</h2>
          <ReactPlayer
            url={myStream}
            height="300px"
            width="300px"
            playing
            muted
          />
        </div>
      )}
      {myStream && <button onClick={sendStreams}>Send Stream</button>}
      {remoteStream && (
        <div>
          <h2>Remote Stream</h2>
          <ReactPlayer
            url={remoteStream}
            height="300px"
            width="300px"
            playing
            muted
          />
        </div>
      )}
    </div>
  );
};

export default Meeting;