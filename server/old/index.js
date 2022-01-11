// //Import helper functions
// const {
// 	createLobby,
// 	joinLobby,
// 	leaveLobby,
// 	switchLobby,
// } = require("./lobby.js");

// //Setup express server to listen on port 3000
// const express = require("express");
// const { createServer } = require("http");
// const { Server } = require("socket.io");

// const app = express();
// const httpServer = createServer(app);
// const io = new Server(httpServer, { /* options */ });

// const express = require("express");
// const app = express();
// var server = app.listen(3000);
// app.use(express.static("./client"));

// console.log("Server is running!");

// //start socket io and run "newConnection" for every new client
// var socket = require("socket.io");
// var io = socket(server);
// io.sockets.on("connection", newConnection);

// let lobbys = [];

// function newConnection(socket) {
// 	//let lobbyNumber;
// 	//let username = "";
// 	//socket.on("switchLobby", switchLobby);
// 	//socket.on("createLobby", createLobby);

// 	console.log("New connection: ", socket.id);

// 	socket.on("createLobby", createLobby);
// 	socket.on("switchLobby", switchLobby);
// }

// //Create a new room
// io.of("/").adapter.on("create-room", (room) => {
// 	socket.join(createLobby());
// 	console.log("Room", room, "was created!");
// 	console.log(socket.rooms);
// });

// //Join a room
// io.of("/").adapter.on("join-room", (room, id) => {
// 	console.log("user: ", id, "has joined room: ", room);
// });

// //leave a room
// io.of("/").adapter.on("leave-room", (room, id) => {
// 	console.log("user: ", id, "has left room: ", room);
// 	//leaveLobby(room, id);
// });
