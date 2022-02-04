const Room = require("./room");

let allRooms = {};

function randomNumber() {
	let start = 10000,
		range = 99999;
	return String(Math.floor(Math.random() * (range - start) + start));
}

function createRoom(socket,seed,io) {
	//Checks if the seed only conatins digits
	seed = /^\d+$/.test(seed) ? seed : randomNumber();
	roomID = randomNumber();

	console.log("Creating room with code: " + roomID, " and seed: " + seed);

	//create and save room instance
	allRooms[roomID] = new Room(roomID, seed,io);
	
	joinRoom.call(socket, roomID);

}

function replyToSocket(socket, message, type) {
	if (type == "error" || type == "success") {
		socket.emit("reply", {"message":message, "type":type});
	} else {
		console.log("Error: replyToSocket() - type is not 'error' or 'success'");
	}
}

function leaveCurrentRoom(socket) {
	let currentRoom = socket.data.currentRoom;
	if (currentRoom != "") {
		allRooms[currentRoom].removePlayer(socket.id);
		socket.leave(currentRoom);
		socket.to(currentRoom).emit("leftRoom",socket.id);
		replyToSocket(socket, "Left Room", "success");
	}
}

function joinRoom(roomID) {
	const socket = this;
	leaveCurrentRoom(socket);
	if (allRooms[roomID] && allRooms[roomID].players.length < 4) {
		socket.join(roomID);
		socket.data.currentRoom = roomID;
		
		allRooms[roomID].addPlayer(socket);
		console.log(socket.id + " joined room " + roomID);
		socket.emit("joinedRoom", allRooms[roomID].getRoomData());
		
		replyToSocket(socket,"Joining room " + roomID, "success");
	} else {
		replyToSocket(socket,"Room not found or is full", "error");
	}
}

function callRoomFunction(socket,func,...args) {
	if (socket.data.currentRoom) {
		allRooms[socket.data.currentRoom][func](socket,...args);
	}
}

module.exports = {
	createRoom: createRoom,
	joinRoom: joinRoom,
	leaveCurrentRoom: leaveCurrentRoom,
	callRoomFunction: callRoomFunction

};
