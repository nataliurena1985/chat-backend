const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { Socket } = require("dgram");
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`usuario actual :${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`usuario con id :${socket.id} se unio a la sala : ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log("mensaje recibido");
    console.log(data);
  });

  socket.on("disconnet", () => {
    console.log("usuario desconectado", socket.id);
  });
});

server.listen(3001, () => {
  console.log("servidor corriendo en el puerto 3001");
});

console.log("hola mundo");
