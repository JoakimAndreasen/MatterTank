//Import helper functions
const {createRoom,joinRoom} = require("./rooms.js");

//const express = require("express");
//const { createServer } = require("http");
//const { Server } = require("socket.io");

/*const app = express();
app.use(express.static("./client"));
const httpServer = createServer(app);
const io = new Server(httpServer, {});*/

const options = { cors: {
    origin: "http://localhost:5500",
    methods: ["GET", "POST"]
  } };
const io = require("socket.io")(3000,options);




io.on("connection", (socket) => {
	console.log(socket.id, "joined the server");
	socket.data.currentRoom = "";

	socket.on("create-room", createRoom);

	socket.on("join-room", joinRoom);

	socket.on("updatePlayers", (playerData) => {
		if (socket.data.currentRoom) {
			socket.to(socket.data.currentRoom).emit("updatePlayers", [playerData, socket.id]);
		}
	});

	socket.on("updateBullets", (bulletsData) => {
		if (socket.data.currentRoom) {
			socket.to(socket.data.currentRoom).emit("updateBullets", [bulletsData, socket.id]);
		}
	});

	socket.on("disconnecting", (reason) => {
		for (const room of socket.rooms) {
		  if (room !== socket.id) {
			socket.to(room).emit("leftRoom", socket.id);
		  }
		}
	  });
});

//io.to("room1").emit("message", "Hello from room1");
console.log("Server started");

