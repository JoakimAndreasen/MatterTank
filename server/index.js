//Import helper functions
const {
	createRoom,
	joinLobby,
	leaveLobby,
	switchLobby,
} = require("./rooms.js");

const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(express.static("./client"));
const httpServer = createServer(app);
const io = new Server(httpServer, {

});

let allRooms = {};

io.on("connection", (socket) => {
	let currentRoom = "";
	console.log(socket.id, "joined the server");

	socket.on("create-room", (seed) => {
		let start = 10000,
			range = 99999;
		currentRoom = String(Math.floor(Math.random() * (range - start) + start));
		allRooms[currentRoom] = createRoom(socket, seed, currentRoom);
		socket.emit("joinedRoom", allRooms[currentRoom].publicData);
	});

	socket.on("join-room", (roomID) => {
		if (allRooms[roomID]) {
			socket.join(roomID);
			currentRoom = roomID;
			console.log(socket.id + " joined room " + roomID);
			socket.emit("joinedRoom", allRooms[roomID].publicData);
		} else {
			socket.emit("reply", "Room not found");
		}
	});

	socket.on("updatePlayers", (playerData) => {
		
		if (currentRoom) {
			socket.to(currentRoom).emit("update", [playerData, socket.id]);
		}
	});
});

io.to("room1").emit("message", "Hello from room1");

httpServer.listen(3000);
