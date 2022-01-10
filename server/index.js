//Import helper functions
const { createLobby, joinLobby, leaveLobby, switchLobby } = require("./lobby.js");

//Setup express server to listen on port 3000
const express = require("express");
const app = express();
var server = app.listen(3000);
app.use(express.static("./client"));

console.log("Server is running!");

//start socket io and run "newConnection" for every new client
var socket = require("socket.io");
var io = socket(server);
io.sockets.on("connection", newConnection);

let lobbys = [];

io.of("/").adapter.on("create-room", (room) => {
    //createLobby(room);
});

io.of("/").adapter.on("create-room", (room) => {
    //createLobby(room);
});

io.of("/").adapter.on("join-room", (room, id) => {
    //joinLobby(room, id);
});

io.of("/").adapter.on("leave-room", (room, id) => {
    //leaveLobby(room, id);
});

function newConnection(socket) {
    let lobbyNumber;
    let username = "";
    socket.on("switchLobby", switchLobby);
    socket.on("createLobby", createLobby);

    console.log("New connection: ", socket.id);
}