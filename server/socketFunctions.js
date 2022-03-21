const Room = require("./room");

let allRooms = {};

function randomNumber() {
	let start = 10000,
		range = 99999;
	return String(Math.floor(Math.random() * (range - start) + start));
}

function createRoom(socket,seed,io) {
	//Checks if the seed only conatins digits
	let staticSeed = true
	if (!/^\d+$/.test(seed)) {
		seed = randomNumber();
		staticSeed = false
	}
	roomID = randomNumber();

	//console.log("Creating room with code: " + roomID, " and seed: " + seed);

	//create and save room instance
	allRooms[roomID] = new Room(roomID, seed, staticSeed, io);
	allRooms[roomID].newRound();
	joinRoom(roomID, socket, io);

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
		socket.leave(currentRoom);
		allRooms[currentRoom].removePlayer(socket.id); //sends newRound to players
		socket.to(currentRoom).emit("leftRoom",socket.id);
		replyToSocket(socket, "Left Room", "success");
		if (allRooms[currentRoom].players.length == 0) {
			delete allRooms[currentRoom];
		}
	}
	socket.data.currentRoom=""; //fix leave lobby

}

function joinRoom(roomID,socket,io) {
	if (socket.data.currentRoom != roomID) {
		leaveCurrentRoom(socket);
		if (allRooms[roomID] && allRooms[roomID].players.length < 4) {
			socket.join(roomID);
			socket.data.currentRoom = roomID;
			
			allRooms[roomID].addPlayer(socket);
			//console.log(socket.id + " joined room " + roomID);
			socket.emit("joinedRoom", allRooms[roomID].getRoomData());
			callRoomFunction(socket,"getAllMessages")
			replyToSocket(socket,"Joining room " + roomID, "success");
			io.in(roomID).emit("updateLobbyInfo", allRooms[roomID].getRoomData());
		} else {
			replyToSocket(socket,"Room not found or is full", "error");
		}
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
