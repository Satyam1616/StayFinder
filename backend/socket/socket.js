// // socket.js
// import { Server } from "socket.io";

// let io;

// export const initSocket = (server) => {
//   io = new Server(server, {
//     cors: {
//       origin: "http://localhost:5173",
//       methods: ["GET", "POST"],
//     },
//   });

//   io.on("connection", (socket) => {
//     console.log("Socket connected:", socket.id);

//     socket.on("new-booking", (data) => {
//       console.log("New booking received:", data);
//       io.emit("booking-added", data);
//     });

//     socket.on("disconnect", () => {
//       console.log("User disconnected:", socket.id);
//     });
//   });

//   return io;
// };

// export const getIO = () => {
//   if (!io) throw new Error("Socket.io not initialized");
//   return io;
// };

import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://stayfinder-frontend-rkk6.onrender.com", // or your frontend domain
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// Attach io instance to request (optional, useful in route files)
app.set("io", io);

// // Socket connection
// io.on("connection", (socket) => {
//   console.log("Socket connected:", socket.id);

//   // When a new booking is made
//   socket.on("new-booking", (data) => {
//     console.log("New booking received:", data);

//     // Emit event to all connected clients
//     io.emit("booking-added", data); // or socket.broadcast.emit to exclude sender
//   });

//   socket.on("update-booking", (data) => {
//     console.log("Booking update", data);

//     // Emit event to all connected clients
//     io.emit("booking-updated", data); // or socket.broadcast.emit to exclude sender
//   });

//   // Optional: handle disconnects
//   socket.on("disconnect", () => {
//     console.log("Socket disconnected:", socket.id);
//   });
// });
const userSocketMap = {};
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("register", (userId) => {
    userSocketMap[userId] = socket.id;
    console.log(`User ${userId} registered with socket ${socket.id}`);
  });

  socket.on("new-booking", (data) => {
    console.log("New booking received:", data);

    const hostSocketId = userSocketMap[data.hostId]; // assuming data.hostId is sent
    if (hostSocketId) {
      io.to(hostSocketId).emit("booking-added", data);
    }
  });

  socket.on("update-booking", (data) => {
    console.log("Booking update", data);

    const userSocketId = userSocketMap[data.userId]; // assuming data.userId is sent
    if (userSocketId) {
      io.to(userSocketId).emit("booking-updated", data);
    }
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
    for (const userId in userSocketMap) {
      if (userSocketMap[userId] === socket.id) {
        delete userSocketMap[userId];
        break;
      }
    }
  });
});

const PORT = 3000;
export { server, app, io, userSocketMap };
