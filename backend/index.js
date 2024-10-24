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
const emailToSocketIdMap = new Map();
const socketIdToEmailMap = new Map();
io.on('connection', (socket) => {
  console.log("Socket connected",socket.id);
  socket.on('room:join',(data)=>{
      const {room,email} = data;
      emailToSocketIdMap.set(email,socket.id);
      socketIdToEmailMap.set(socket.id,email);
      io.to(room).emit("user:joined",{email,id:socket.id});
      socket.join(room);
      io.to(socket.id).emit("room:join",data);
  })
  socket.on('user:call',({to,offer})=>{
      io.to(to).emit('incoming:call',{from:socket.id,offer})
  })
  socket.on('call:accepted',(to,ans)=>{
      io.to(to).emit('call:accepted',{from:socket.id,ans})

  })
  socket.on('peer:nego:needed',({to,offer})=>{
      io.to(to).emit("peer:nego:needed",{from:socket.id,offer});
  })
  socket.on('peer:nego:done',({to,ans})=>{
      io.to(to).emit("peer:nego:final",{from:socket.id,ans});
      
  })
})

server.listen(8000, () => {
  console.log("Server running at 8000");
});
