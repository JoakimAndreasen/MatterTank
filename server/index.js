//Libaries
var matter = require("matter-js");

//Setup express server to listen on port 3000
var express = require("express");
var app = express();
var server = app.listen(3000);
app.use(express.static("./client"));

console.log("Server is running!");

//start socket io and run "newConnection" for every new client
var socket = require("socket.io");
var io = socket(server);
io.sockets.on("connection", newConnection);