import express from "express";
import connectDB from "./config/connectDB.js";
import userRoutes from "./routes/userRoutes.js";
import http from "http";
import { Server } from "socket.io";
import meetingRoutes from "./routes/meetingRoutes.js"
const app = express();
import cors from "cors";
connectDB();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Working");
});
const participants = {};
app.use("/api/users", userRoutes);
app.use("/api/meeting",meetingRoutes);
const server = new http.createServer(app);
const io = new Server(server, {
  cors: true,
});
io.on("connect", (socket) => {
  console.log(socket.client.id);
  socket.on("message",(msg)=>{
    console.log(msg)
  })
  socket.on("user:joined",(s)=>{
    socket.broadcast.emit("user:joined",{s,id:socket.id});
  })
  socket.on("offer",(offer)=>{
    console.log("offer received");
    socket.broadcast.emit("offer",offer);
  })

  socket.on("answer",(answer)=>{
    console.log("answer received");
    socket.broadcast.emit("answer", answer);
  })

  socket.on("ice-candidate", (candidate) => {
    console.log("ICE candidate received");
    socket.broadcast.emit("ice-candidate", candidate); // Broadcast the ICE candidate
  });

  socket.on("check-participants", (roomId) => {
    if (!participants[roomId]) participants[roomId] = [];
    participants[roomId].push(socket.id);
    const isInitiator = participants[roomId].length === 1;
    socket.emit("check-participants-result", isInitiator);
  });

  socket.on("disconnect", () => {
    for (const roomId in participants) {
      participants[roomId] = participants[roomId].filter(id => id !== socket.id);
      if (participants[roomId].length === 0) {
        delete participants[roomId];
      }
    }
  });
});

server.listen(8000, () => {
  console.log("Server running at 8000");
});
